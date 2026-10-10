import { memo, useId } from "react";

/* Tile of 2A × 3S (pointy-top hexagons with side S). It holds one full
 * hexagon and the vertical edge that links to the next row. Neighbor tiles
 * draw the other edges, so no line is drawn twice (it would look brighter).
 */
const SIDE = 20;
const A = Math.round(((SIDE * Math.sqrt(3)) / 2) * 100) / 100;
const TILE_W = A * 2;
const TILE_H = SIDE * 3;

const HEX_PATH = [
  `M0 ${SIDE / 2}`,
  `L${A} 0`,
  `L${TILE_W} ${SIDE / 2}`,
  `V${SIDE * 1.5}`,
  `L${A} ${SIDE * 2}`,
  `L0 ${SIDE * 1.5}`,
  "Z",
  `M${A} ${SIDE * 2}`,
  `V${TILE_H}`,
].join(" ");

interface HexLayerProps {
  className: string;
  /** Stroke opacity. */
  alpha: number;
  /** Palette tone (0-4). */
  tone: 0 | 1 | 2 | 3 | 4;
}

function HexLayer({ className, alpha, tone }: HexLayerProps) {
  // useId returns ":r1:" (React 18) or other symbols (React 19): keep only safe characters
  const id = `abg-hex-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <pattern
          id={id}
          width={TILE_W}
          height={TILE_H}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={HEX_PATH}
            fill="none"
            strokeWidth={1}
            style={{ stroke: `hsl(var(--abg-tone-${tone}) / ${alpha})` }}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export const Hexagons = memo(function Hexagons() {
  return (
    <>
      <HexLayer className="abg-hex" alpha={0.16} tone={2} />
      <HexLayer className="abg-hex abg-sweep" alpha={0.7} tone={3} />
    </>
  );
});
