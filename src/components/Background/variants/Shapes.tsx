import { memo } from "react";
import { withVars } from "../utils";

interface ShapeConfig {
  /** `ring` draws only the border; `fill` fills the shape. */
  kind: "fill" | "ring";
  width: string;
  height: string;
  top: string;
  left: string;
  /** border-radius: "50%" circle, "34%" squircle, "999px" pill. */
  radius: string;
  color: string;
  alpha: number;
  /** End position of the drift. */
  x: string;
  y: string;
  /** Start and end rotation. */
  r0: string;
  r1: string;
  duration: number;
}

const SHAPES: readonly ShapeConfig[] = [
  { kind: "fill", width: "72vmin", height: "72vmin", top: "-14%", left: "-22%", radius: "50%", color: "--abg-tone-1", alpha: 0.34, x: "6vw", y: "5vh", r0: "0deg", r1: "20deg", duration: 38 },
  { kind: "fill", width: "56vmin", height: "56vmin", top: "22%", left: "62%", radius: "34%", color: "--abg-tone-2", alpha: 0.16, x: "-5vw", y: "6vh", r0: "10deg", r1: "45deg", duration: 44 },
  { kind: "fill", width: "84vmin", height: "30vmin", top: "68%", left: "-12%", radius: "999px", color: "--abg-tone-0", alpha: 0.7, x: "8vw", y: "-4vh", r0: "-22deg", r1: "-12deg", duration: 40 },
  { kind: "ring", width: "26vmin", height: "26vmin", top: "10%", left: "66%", radius: "50%", color: "--abg-tone-3", alpha: 0.2, x: "-4vw", y: "5vh", r0: "0deg", r1: "0deg", duration: 30 },
  { kind: "fill", width: "15vmin", height: "15vmin", top: "62%", left: "72%", radius: "50%", color: "--abg-accent", alpha: 0.18, x: "-6vw", y: "-6vh", r0: "0deg", r1: "0deg", duration: 26 },
  { kind: "fill", width: "18vmin", height: "18vmin", top: "40%", left: "6%", radius: "28%", color: "--abg-tone-3", alpha: 0.12, x: "5vw", y: "4vh", r0: "-10deg", r1: "40deg", duration: 34 },
];

export const Shapes = memo(function Shapes() {
  return (
    <>
      {SHAPES.map((shape, index) => {
        const tone = `hsl(var(${shape.color}) / ${shape.alpha})`;

        return (
          <div
            key={index}
            className="abg-shape"
            style={withVars({
              width: shape.width,
              height: shape.height,
              top: shape.top,
              left: shape.left,
              borderRadius: shape.radius,
              ...(shape.kind === "ring"
                ? { border: `2px solid ${tone}` }
                : { background: tone }),
              animationDuration: `${shape.duration}s`,
              animationDelay: `${-index * 5}s`,
              "--abg-x": shape.x,
              "--abg-y": shape.y,
              "--abg-r0": shape.r0,
              "--abg-r1": shape.r1,
            })}
          />
        );
      })}
    </>
  );
});
