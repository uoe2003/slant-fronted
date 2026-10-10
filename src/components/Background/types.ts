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
  "solid",
  "gradient",
  "glow",
  "grain",
  "grid",
] as const;

export type BackgroundVariant = (typeof BACKGROUND_VARIANTS)[number];

/**
 * Colors come from the Tailwind theme (`--color-theme-*`) and the
 * light/dark mode from the `.dark` class: see tokens.css.
 */
export interface BackgroundProps {
  /** Type of background. Default: `waves`. */
  variant?: BackgroundVariant;
  /** Extra classes for the container. */
  className?: string;
}
