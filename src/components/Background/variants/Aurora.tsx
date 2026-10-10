import { memo } from "react";
import { withAlpha, withVars } from "../utils";

const BLOBS = [
  {
    size: "60vmax",
    top: "-20%",
    left: "-15%",
    color: "var(--abg-tone-2)",
    alpha: 0.5,
    x: "18vw",
    y: "12vh",
    duration: 22,
  },
  {
    size: "50vmax",
    top: "30%",
    left: "45%",
    color: "var(--abg-accent)",
    alpha: 0.32,
    x: "-20vw",
    y: "-10vh",
    duration: 28,
  },
  {
    size: "45vmax",
    top: "55%",
    left: "-20%",
    color: "var(--abg-tone-3)",
    alpha: 0.26,
    x: "22vw",
    y: "-14vh",
    duration: 25,
  },
] as const;

export const Aurora = memo(function Aurora() {
  return (
    <>
      {BLOBS.map((blob, index) => (
        <div
          key={index}
          className="abg-blob"
          style={withVars({
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: `radial-gradient(circle, ${withAlpha(blob.color, blob.alpha)} 0%, transparent 70%)`,
            animationDuration: `${blob.duration}s`,
            "--abg-x": blob.x,
            "--abg-y": blob.y,
          })}
        />
      ))}
    </>
  );
});
