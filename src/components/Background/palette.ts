import type { CSSProperties } from "react";
import type { BackgroundMode } from "./types";
import { withVars } from "./utils";

export const DEFAULT_COLOR = "#6750A4"; // Material You purple

interface Hsl {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

const HEX_REGEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const round1 = (value: number) => Math.round(value * 10) / 10;

/** Converts #rgb or #rrggbb to HSL. Returns `null` if the hex is not valid. */
export function hexToHsl(hex: string): Hsl | null {
  const match = HEX_REGEX.exec(hex.trim());
  if (!match) return null;

  let value = match[1];
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h: round1(h), s: round1(s * 100), l: round1(l * 100) };
}

/**
 * "H S% L%" without `hsl()`, so CSS can set the opacity:
 * `hsl(var(--abg-tone-2) / 0.4)`.
 */
const channels = (h: number, s: number, l: number) =>
  `${round1(((h % 360) + 360) % 360)} ${round1(s)}% ${round1(l)}%`;

/** Strong colors are capped so they do not look neon. */
const MAX_SATURATION = 85;
/** Backgrounds are calmer than the decoration. */
const MAX_BG_SATURATION = 60;
/** Flat surfaces are slightly less saturated than the page gradient. */
const SURFACE_SATURATION = 0.9;
/** Chroma at which an input counts as a real color (below it, it fades to gray). */
const FULL_CHROMA = 0.1;

/**
 * 0 = gray (black, white, gray), 1 = clearly colored.
 * The hue of near-black and near-white colors is not reliable in HSL
 * (black has hue 0 = red), so those inputs fade to gray instead.
 */
function colorStrength({ s, l }: Hsl) {
  const chroma = (s / 100) * (1 - Math.abs((2 * l) / 100 - 1));
  return clamp(chroma / FULL_CHROMA, 0, 1);
}

interface Levels {
  /** Page gradient: start and end. */
  bg: readonly [number, number];
  /** Flat color for the `solid` variant. */
  solid: number;
  /** Flat layers very close to the background (waves). */
  surface: readonly [number, number, number, number];
  /** Decoration, from soft (0) to strong (4). */
  tone: readonly [number, number, number, number, number];
  accent: number;
  accentSoft: number;
}

/**
 * Lightness (%) of every step. This is the first place to touch
 * when a background has too much or too little contrast.
 */
const LEVELS: Record<BackgroundMode, Levels> = {
  dark: {
    bg: [7, 14],
    solid: 10,
    surface: [8, 10, 12, 14],
    tone: [16, 26, 40, 58, 72],
    accent: 62,
    accentSoft: 20,
  },
  light: {
    bg: [97, 90],
    solid: 94,
    surface: [96, 94, 92, 90],
    tone: [90, 84, 72, 58, 46],
    accent: 60,
    accentSoft: 84,
  },
};

/**
 * Builds the CSS variables from one base color.
 * - bg-0 / bg-1: page gradient
 * - solid: flat color
 * - surface-0..3: flat layers close to the background
 * - tone-0..4: decoration, from soft to strong
 * - accent / accent-soft: hue shifted by 35º for variety
 *
 * Gray inputs keep their hue-less look: black makes everything a bit
 * darker, white a bit lighter.
 */
export function buildPalette(
  color: string,
  mode: BackgroundMode,
): CSSProperties {
  const base = hexToHsl(color) ?? (hexToHsl(DEFAULT_COLOR) as Hsl);
  const levels = LEVELS[mode] ?? LEVELS.dark;
  const { h } = base;

  const strength = colorStrength(base);
  const sat = Math.min(base.s, MAX_SATURATION) * strength;
  const bgSat = Math.min(sat, MAX_BG_SATURATION);
  const surfaceSat = bgSat * SURFACE_SATURATION;

  // -1 = black, 0 = any color, 1 = white
  const lean = ((base.l - 50) / 50) * (1 - strength);
  const bgL = (l: number) => clamp(l + lean * 3, 0, 100);
  const toneL = (l: number) => clamp(l + lean * 6, 4, 96);

  const vars: Record<string, string> = {
    "--abg-bg-0": channels(h, bgSat, bgL(levels.bg[0])),
    "--abg-bg-1": channels(h, bgSat, bgL(levels.bg[1])),
    "--abg-solid": channels(h, bgSat, bgL(levels.solid)),
    "--abg-accent": channels(h + 35, sat, toneL(levels.accent)),
    "--abg-accent-soft": channels(h + 35, sat * 0.7, bgL(levels.accentSoft)),
  };

  levels.surface.forEach((l, i) => {
    vars[`--abg-surface-${i}`] = channels(h, surfaceSat, bgL(l));
  });
  levels.tone.forEach((l, i) => {
    vars[`--abg-tone-${i}`] = channels(h, sat, toneL(l));
  });

  return withVars(vars);
}
