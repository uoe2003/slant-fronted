import { useEffect, useState } from "react";
import { Gamepad2, Play, Star, Trophy } from "lucide-react";
import { Link } from "react-router";
import { Progress } from "@/components/ui/progress";
import type { GameMode, OfflineProgress } from "../types";
import { StatChip } from "./StatChip";

interface OfflineModeCardProps {
  mode: GameMode;
  progress: OfflineProgress;
}

export function OfflineModeCard({ mode, progress }: OfflineModeCardProps) {
  const {
    currentLevel,
    levelsCompleted,
    totalLevels,
    starsEarned,
    totalStars,
  } = progress;
  const percent =
    totalLevels > 0 ? Math.round((levelsCompleted / totalLevels) * 100) : 0;
  const [shownPercent, setShownPercent] = useState(0);

  // Start empty so the bar fills when the page opens
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShownPercent(percent));
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  return (
    <Link
      to={mode.path}
      className="relative block overflow-hidden rounded-3xl border border-theme-50/10 bg-theme-50/4 p-5 backdrop-blur-sm transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-theme-300"
    >
      <Gamepad2
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-6 size-36 -rotate-12 text-theme-50/6"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight text-theme-50">
              {mode.title}
            </h2>
            <p className="mt-0.5 text-sm text-theme-400">
              {levelsCompleted > 0 ? "Continúa" : "Empieza"} en el nivel{" "}
              {currentLevel}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-theme-300 text-theme-950"
          >
            <Play className="size-5 translate-x-px fill-current" />
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <StatChip
            icon={Trophy}
            value={levelsCompleted}
            total={totalLevels}
            label="niveles superados"
          />
          <StatChip
            icon={Star}
            iconClassName="text-amber-300"
            value={starsEarned}
            total={totalStars}
            label="estrellas conseguidas"
          />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-baseline justify-between text-[13px]">
            <span className="text-theme-500">Progreso total</span>
            <span className="font-semibold text-theme-200 tabular-nums">
              {percent}%
            </span>
          </div>
          <Progress
            value={shownPercent}
            aria-label="Progreso total"
            className="h-2 bg-theme-50/10 [&>div]:bg-theme-300 [&>div]:duration-1000 [&>div]:ease-out motion-reduce:[&>div]:transition-none"
          />
        </div>
      </div>
    </Link>
  );
}
