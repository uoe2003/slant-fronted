import type { ComponentType } from "react";
import type { BackgroundVariant } from "../types";
import { Aurora } from "./Aurora";
import { Bubbles } from "./Bubbles";
import { Dots } from "./Dots";
import { Glow } from "./Glow";
import { Gradient } from "./Gradient";
import { Grain } from "./Grain";
import { Grid } from "./Grid";
import { Hexagons } from "./Hexagons";
import { Rings } from "./Rings";
import { Shapes } from "./Shapes";
import { Solid } from "./Solid";
import { Stars } from "./Stars";
import { Stripes } from "./Stripes";
import { Waves } from "./Waves";

/**
 * Variant registry. It is typed as Record<BackgroundVariant, ...>, so
 * TypeScript warns if you add a name in types.ts and forget to register it here.
 */
export const VARIANTS: Record<BackgroundVariant, ComponentType> = {
  waves: Waves,
  dots: Dots,
  aurora: Aurora,
  bubbles: Bubbles,
  rings: Rings,
  stars: Stars,
  hexagons: Hexagons,
  shapes: Shapes,
  stripes: Stripes,
  solid: Solid,
  gradient: Gradient,
  glow: Glow,
  grain: Grain,
  grid: Grid,
};
