import { memo } from "react";
import { withVars } from "../utils";

/** Fixed values (no Math.random) so nothing changes between renders. */
const BUBBLES = Array.from({ length: 14 }, (_, i) => ({
  size: 18 + ((i * 37) % 56),
  left: (i * 53) % 96,
  duration: 16 + ((i * 7) % 14),
  delay: -((i * 5) % 20), // negative: the screen starts already filled
  sway: (i % 2 === 0 ? 1 : -1) * (10 + ((i * 3) % 24)),
  rest: 5 + ((i * 29) % 85), // fixed position when motion is reduced
}));

export const Bubbles = memo(function Bubbles() {
  return (
    <>
      {BUBBLES.map((bubble, index) => (
        <span
          key={index}
          className="abg-bubble"
          style={withVars({
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            "--abg-sway": `${bubble.sway}px`,
            "--abg-rest": `${bubble.rest}%`,
          })}
        />
      ))}
    </>
  );
});
