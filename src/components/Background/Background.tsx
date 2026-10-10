import { memo, useMemo } from "react";
import "./style.css";
import { DEFAULT_COLOR, buildPalette } from "./palette";
import type { BackgroundProps } from "./types";
import { VARIANTS } from "./variants";

function BackgroundBase({
  variant = "waves",
  color = DEFAULT_COLOR,
  mode = "dark",
  className = "",
}: BackgroundProps) {
  const palette = useMemo(() => buildPalette(color, mode), [color, mode]);
  // Unexpected runtime values (e.g. old data in localStorage) fall back to waves
  const Variant = VARIANTS[variant] ?? VARIANTS.waves;

  return (
    <div
      aria-hidden="true"
      data-variant={variant}
      data-mode={mode}
      className={`abg-root ${className}`.trim()}
      style={palette}
    >
      {/* key: remounts on variant change so the fade-in plays again */}
      <div key={variant} className="abg-layer">
        <Variant />
      </div>
    </div>
  );
}

export const Background = memo(BackgroundBase);
export default Background;
