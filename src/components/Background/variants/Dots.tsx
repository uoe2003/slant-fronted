import { memo } from "react";

/**
 * Grid of small dots (size and spacing are in style.css, Dots block).
 * Two "spots" with different speeds and directions cross the screen
 * and light up the dots they pass.
 */
export const Dots = memo(function Dots() {
  return (
    <>
      <div className="abg-dots" />
      <div className="abg-dots-glow abg-sweep" />
      <div className="abg-dots-glow abg-sweep abg-sweep--alt" />
    </>
  );
});
