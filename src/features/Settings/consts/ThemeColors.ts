import type { ColorOption } from "../components/ColorSelector";

interface ThemeColorDefinition {
  /** Accent color (Tailwind 300 shade). */
  value: string;
  /** Readable color to place on top of `value`. */
  foreground: string;
}

// Record forces every ThemeColor to be defined; key order is the display order.
export const THEME_COLORS: Record<string, ThemeColorDefinition> = {
  red: { value: "#f87171", foreground: "#450a0a" },
  orange: { value: "#fb923c", foreground: "#431407" },
  amber: { value: "#fbbf24", foreground: "#451a03" },
  yellow: { value: "#facc15", foreground: "#422006" },
  lime: { value: "#a3e635", foreground: "#1a2e05" },
  green: { value: "#4ade80", foreground: "#052e16" },
  emerald: { value: "#34d399", foreground: "#022c22" },
  teal: { value: "#2dd4bf", foreground: "#042f2e" },
  cyan: { value: "#22d3ee", foreground: "#083344" },
  sky: { value: "#38bdf8", foreground: "#082f49" },
  blue: { value: "#60a5fa", foreground: "#172554" },
  indigo: { value: "#818cf8", foreground: "#1e1b4b" },
  violet: { value: "#a78bfa", foreground: "#2e1065" },
  purple: { value: "#c084fc", foreground: "#3b0764" },
  fuchsia: { value: "#e879f9", foreground: "#4a044e" },
  pink: { value: "#f472b6", foreground: "#500724" },
  rose: { value: "#fb7185", foreground: "#4c0519" },
  slate: { value: "#94a3b8", foreground: "#020617" },
  gray: { value: "#9ca3af", foreground: "#030712" },
  white: { value: "#ffffff", foreground: "#0f172a" },
  black: { value: "#000000", foreground: "#f8fafc" },
};

export const THEME_COLORS_OPTIONS: ColorOption<string>[] = (
  Object.keys(THEME_COLORS) as string[]
).map((key) => ({
  value: key,
  label: key.charAt(0).toUpperCase() + key.slice(1),
  color: THEME_COLORS[key].value,
}));
