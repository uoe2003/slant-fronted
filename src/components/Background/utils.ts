import type { CSSProperties } from "react";

/** Custom properties (--x) are not part of CSSProperties. */
export const withVars = (style: Record<string, string | number>) =>
  style as CSSProperties;

/** Rounds to 1 decimal (keeps SVG paths and styles short). */
export const round = (value: number) => Math.round(value * 10) / 10;

/**
 * Applies opacity (0-1) to any CSS color, e.g. `var(--abg-tone-2)`.
 * Same technique Tailwind v4 uses for `bg-theme-500/40`, so it works
 * with theme colors in any format (oklch, hex, hsl…).
 */
export const withAlpha = (color: string, alpha: number) =>
  `color-mix(in oklab, ${color} ${round(alpha * 100)}%, transparent)`;

/**
 * Deterministic pseudo-random number in [0, 1).
 * Used instead of Math.random() so positions do not change between renders.
 */
export function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
