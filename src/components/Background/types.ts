export const BACKGROUND_VARIANTS = [
  "waves",
  "dots",
  "aurora",
  "bubbles",
  "rings",
  "stars",
  "hexagons",
  "shapes",
  "stripes",
  // Calm options: no motion, very light on the GPU
  "solid",
  "gradient",
  "glow",
  "grain",
  "grid",
] as const;

export type BackgroundVariant = (typeof BACKGROUND_VARIANTS)[number];

export type BackgroundMode = "dark" | "light";

export interface BackgroundProps {
  /** Type of background. Default: `waves`. */
  variant?: BackgroundVariant;
  /** Base color as hex (`#6750A4` or `#67A`). Invalid values use the default color. */
  color?: string;
  /** Dark (default) or light tones. */
  mode?: BackgroundMode;
  /** Extra classes for the container. */
  className?: string;
}
