import { useEffect, useState, type ReactNode } from "react";

const SIZE = 136;
const STROKE = 7;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface LevelRingProps {
  /** Value from 0 to 1. */
  progress: number;
  children: ReactNode;
}

export function LevelRing({ progress, children }: LevelRingProps) {
  const [displayed, setDisplayed] = useState(0);

  // Start empty so the ring fills when the page opens
  useEffect(() => {
    const frame = requestAnimationFrame(() => setDisplayed(progress));
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  return (
    <div className="relative grid size-34 place-items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 size-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          className="stroke-theme-50/10"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - displayed)}
          className="stroke-theme-300 transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none"
        />
      </svg>
      {children}
    </div>
  );
}
