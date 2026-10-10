import type { ColorOption } from "../components/ColorSelector";

export const THEME_COLORS = [
  "grayscale",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "taupe",
  "mauve",
  "mist",
  "olive",
] as const;

export const THEME_COLORS_OPTIONS: ColorOption<string>[] = THEME_COLORS.map(
  (color) => ({
    value: color,
    label: color.charAt(0).toUpperCase() + color.slice(1),
    color: `var(--color-${color}-600)`,
  }),
);
