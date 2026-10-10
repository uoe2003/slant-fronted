import { memo } from "react";
import { round, withVars } from "../utils";

/* The wave repeats every PERIOD units and the viewBox holds 2 periods.
 * Moving the SVG by -50% of its width is exactly one period, so the loop
 * is perfect. The SVG width (--abg-w) sets the wavelength: with 200%, one
 * wave is as wide as the screen.
 */
const PERIOD = 720;
const VIEW_W = PERIOD * 2;
const VIEW_H = 200;
const STEP = 24;
/** Part of the layer outside the screen (% of height), so the bobbing leaves no gaps. */
const OVERHANG = 2;

type WaveSide = "top" | "bottom";

interface WaveConfig {
  side: WaveSide;
  /** Flat tone: 1 is closest to the background, 3 is closest to the screen edge. */
  surface: 1 | 2 | 3;
  /** Distance between the crest and the screen edge (% of height). */
  rest: number;
  /** Wave height (% of screen height). */
  amplitude: number;
  /** Weight of the second harmonic: makes the wave less symmetric. */
  ripple: number;
  phase: number;
  /** SVG width in % of the container. */
  width: number;
  /** Seconds to travel one full period. */
  slide: number;
  reverse: boolean;
  /** Vertical bobbing (vh) and duration (s). Keep it below OVERHANG. */
  bob: number;
  bobDuration: number;
}

/* Drawing order: back to front. Each side has 3 nested bands. */
const WAVES: readonly WaveConfig[] = [
  { side: "top", surface: 1, rest: 22, amplitude: 3, ripple: 0.3, phase: 0.6, width: 220, slide: 90, reverse: false, bob: 0.8, bobDuration: 14 },
  { side: "bottom", surface: 1, rest: 25, amplitude: 2.8, ripple: 0.3, phase: 2.2, width: 240, slide: 80, reverse: true, bob: 0.9, bobDuration: 16 },
  { side: "top", surface: 2, rest: 16, amplitude: 1.8, ripple: 0.35, phase: 2.9, width: 200, slide: 70, reverse: true, bob: 0.6, bobDuration: 11 },
  { side: "bottom", surface: 2, rest: 14, amplitude: 2, ripple: 0.3, phase: 1.3, width: 260, slide: 62, reverse: false, bob: 0.7, bobDuration: 13 },
  { side: "top", surface: 3, rest: 8, amplitude: 1.2, ripple: 0.3, phase: 4.1, width: 280, slide: 56, reverse: false, bob: 0.4, bobDuration: 10 },
  { side: "bottom", surface: 3, rest: 3, amplitude: 1.3, ripple: 0.3, phase: 5.2, width: 300, slide: 50, reverse: true, bob: 0.4, bobDuration: 12 },
];

/**
 * Sum of two sines (the second one is harmonic 2, so it stays periodic),
 * smoothed with quadratic curves between midpoints.
 * Config sizes (% of screen) are converted to viewBox units.
 */
function buildWave({ side, rest, amplitude, ripple, phase }: WaveConfig) {
  const flip = side === "top";
  const reach = amplitude * (1 + ripple);
  const box = reach + rest + OVERHANG; // layer height, % of screen
  const unit = VIEW_H / box;
  const baseline = reach * unit;
  const amp = amplitude * unit;

  const points: Array<[number, number]> = [];
  for (let x = 0; x <= VIEW_W; x += STEP) {
    const t = (x / PERIOD) * Math.PI * 2;
    const y =
      baseline +
      amp * (Math.sin(t + phase) + ripple * Math.sin(2 * t + phase * 1.7));
    points.push([x, round(flip ? VIEW_H - y : y)]);
  }

  let path = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    path += ` Q${x} ${y} ${round((x + nx) / 2)} ${round((y + ny) / 2)}`;
  }
  const [lastX, lastY] = points[points.length - 1];
  path += ` L${lastX} ${lastY} V${flip ? 0 : VIEW_H} H0 Z`;

  return { path, box: round(box) };
}

// Computed once when the module loads, not on every render.
const LAYERS = WAVES.map((config) => ({ config, ...buildWave(config) }));

export const Waves = memo(function Waves() {
  return (
    <>
      <div className="abg-wave-base" />

      {LAYERS.map(({ config, path, box }, index) => (
        <div
          key={index}
          className="abg-wave-layer"
          style={withVars({
            [config.side]: `-${OVERHANG}%`,
            height: `${box}%`,
            animationDuration: `${config.bobDuration}s`,
            animationDelay: `${-index * 3}s`,
            "--abg-bob": `${config.bob}vh`,
          })}
        >
          <svg
            className="abg-wave"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            style={withVars({
              "--abg-w": `${config.width}%`,
              animationDuration: `${config.slide}s`,
              animationDelay: `${-index * 17}s`,
              animationDirection: config.reverse ? "reverse" : "normal",
            })}
          >
            <path
              d={path}
              style={{ fill: `hsl(var(--abg-surface-${config.surface}))` }}
            />
          </svg>
        </div>
      ))}
    </>
  );
});
