import { memo } from "react";
import "./tokens.css";
import "./style.css";
import type { BackgroundProps } from "./types";
import { VARIANTS } from "./variants";

function BackgroundBase({
  variant = "waves",
  className = "",
}: BackgroundProps) {
  // Unexpected runtime values (e.g. old data in localStorage) fall back to waves
  const Variant = VARIANTS[variant] ?? VARIANTS.waves;

  return (
    <div
      aria-hidden="true"
      data-variant={variant}
      className={`abg-root ${className}`.trim()}
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
