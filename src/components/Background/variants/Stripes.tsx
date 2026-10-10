import { memo } from "react";
import { withVars } from "../utils";

/**
 * Two layers of bands with different period, opacity and speed,
 * moving in opposite directions. This adds depth and hides the loop.
 */
const LAYERS = [
  { period: 120, alpha: 0.08, duration: 50, reverse: false },
  { period: 200, alpha: 0.05, duration: 80, reverse: true },
] as const;

export const Stripes = memo(function Stripes() {
  return (
    <div className="abg-stripes">
      {LAYERS.map((layer, index) => (
        <div
          key={index}
          className="abg-stripes-inner"
          style={withVars({
            "--abg-period": `${layer.period}px`,
            "--abg-alpha": layer.alpha,
            "--abg-dur": `${layer.duration}s`,
            animationDirection: layer.reverse ? "reverse" : "normal",
          })}
        />
      ))}
    </div>
  );
});
