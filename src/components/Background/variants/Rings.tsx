import { memo } from "react";
import { withVars } from "../utils";

const RINGS = [0, 1, 2, 3];

export const Rings = memo(function Rings() {
  return (
    <>
      <div className="abg-glow" />
      {RINGS.map((i) => (
        <div key={i} className="abg-ring" style={withVars({ "--abg-i": i })} />
      ))}
    </>
  );
});
