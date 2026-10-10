import { memo } from "react";
import { pseudoRandom, round, withVars } from "../utils";

const STAR_COUNT = 64;

/** Fixed positions and timings: the sky is the same on every render. */
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => {
  const rand = (k: number) => pseudoRandom(i * 17 + k * 131 + 1);
  return {
    left: round(rand(1) * 100),
    top: round(rand(2) * 100),
    size: round(1 + rand(3) * 1.5),
    low: round(0.1 + rand(4) * 0.2),
    high: round(0.45 + rand(5) * 0.5),
    duration: round(3 + rand(6) * 6),
    delay: -round(rand(7) * 8),
    accent: rand(8) > 0.88, // about 1 in 8 uses the accent color
  };
});

/** Far apart in time, so they are a small detail and not a constant effect. */
const SHOOTING_STARS = [
  { top: "12%", left: "58%", duration: 17, delay: -3 },
  { top: "34%", left: "10%", duration: 23, delay: -11 },
] as const;

export const Stars = memo(function Stars() {
  return (
    <>
      {STARS.map((star, index) => (
        <span
          key={index}
          className={star.accent ? "abg-star abg-star--accent" : "abg-star"}
          style={withVars({
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--abg-s": `${star.size}px`,
            "--abg-lo": star.low,
            "--abg-hi": star.high,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          })}
        />
      ))}

      {SHOOTING_STARS.map((shot, index) => (
        <span
          key={`shoot-${index}`}
          className="abg-shoot"
          style={{
            top: shot.top,
            left: shot.left,
            animationDuration: `${shot.duration}s`,
            animationDelay: `${shot.delay}s`,
          }}
        />
      ))}
    </>
  );
});
