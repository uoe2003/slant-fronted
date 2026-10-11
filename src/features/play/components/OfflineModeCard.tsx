import { useEffect, useState } from "react";
import { Gamepad2, Play, Star, Trophy } from "lucide-react";
import { Link } from "react-router";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
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
      className="group relative block overflow-hidden rounded-3xl border border-theme-300/20 bg-theme-50/5 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-theme-300/40 hover:shadow-theme-300/20 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-theme-300"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-theme-300/10 via-transparent to-transparent"
      />

      <Gamepad2
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -bottom-6 size-48 -rotate-12 text-theme-50/5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-0 motion-reduce:transition-none"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-3xl font-black tracking-tight text-theme-50">
              {mode.title}
            </h2>
            <p className="mt-1 text-sm text-theme-400">
              {levelsCompleted > 0 ? "Continúa" : "Empieza"} en el nivel{" "}
              {currentLevel}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="shrink-0 rounded-full bg-theme-950/40 p-2.5 ring-1 ring-theme-50/10 transition-colors group-hover:bg-theme-300/15"
          >
            <Play className="size-5 fill-current text-theme-300 opacity-80" />
          </span>
        </div>

        <div className="mt-5 flex gap-3">
          <StatChip
            icon={Trophy}
            value={levelsCompleted}
            total={totalLevels}
            label="niveles superados"
          />
          <StatChip
            icon={Star}
            iconClassName="fill-amber-300 text-amber-300"
            value={starsEarned}
            total={totalStars}
            label="estrellas conseguidas"
          />
        </div>

        <Progress
          value={shownPercent}
          className="mt-6 gap-2 **:data-[slot=progress-track]:h-2.5 **:data-[slot=progress-track]:bg-theme-950/50 **:data-[slot=progress-indicator]:bg-theme-300 **:data-[slot=progress-indicator]:duration-1000 **:data-[slot=progress-indicator]:ease-out motion-reduce:**:data-[slot=progress-indicator]:transition-none"
        >
          <ProgressLabel className="text-sm font-bold tracking-wider text-theme-50/60 uppercase">
            Progreso total
          </ProgressLabel>
          <ProgressValue className="text-sm font-bold tracking-wider text-theme-50/60">
            {() => `${percent}%`}
          </ProgressValue>
        </Progress>
      </div>
    </Link>
  );
}
