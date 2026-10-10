import { BACKGROUND_VARIANTS } from "@/components/Background";

export const BACKGROUND_OPTIONS = BACKGROUND_VARIANTS.map((variant) => ({
  value: variant,
  label: variant.charAt(0).toUpperCase() + variant.slice(1),
}));
