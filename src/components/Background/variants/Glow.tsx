import { memo } from "react";

/** Two soft lights in opposite corners. Static, so it costs almost nothing. */
export const Glow = memo(function Glow() {
  return <div className="abg-halo" />;
});
