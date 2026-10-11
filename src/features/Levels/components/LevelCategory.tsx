import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LevelCategoryProgress } from "../types";
import { LevelItem } from "./LevelItem";

interface LevelCategoryProps {
  progress: LevelCategoryProgress;
  onSelect: (levelId: string) => void;
}

export function LevelCategory({ progress, onSelect }: LevelCategoryProps) {
  const { theme, levels, stars, maxStars, isLocked } = progress;

  return (
    <section
      aria-label={theme.label}
      className={cn(
        "relative overflow-hidden rounded-3xl p-1 transition-opacity duration-500",
        isLocked ? "pointer-events-none opacity-50" : "opacity-100",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-linear-to-br opacity-40",
          theme.gradient,
        )}
      />

      <div className="relative rounded-[1.4rem] border border-theme-50/5 bg-theme-900/20 p-4 backdrop-blur-xl sm:p-6">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              className={cn(
                "text-2xl font-black tracking-tight uppercase",
                theme.color,
              )}
            >
              {theme.label}
            </h2>
            <p className="text-xs font-bold tracking-wider text-theme-400 uppercase">
              {theme.desc}
            </p>
          </div>

          <div
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-1.5",
              theme.border,
              theme.bg,
            )}
          >
            <Star
              aria-hidden="true"
              className="size-5 fill-amber-400 text-amber-400"
            />
            <span
              aria-hidden="true"
              className="font-mono text-lg text-theme-50 tabular-nums"
            >
              <span className="font-black">{stars}</span>
              <span className="text-xs opacity-70">/{maxStars}</span>
            </span>
            <span className="sr-only">
              {stars} de {maxStars} estrellas
            </span>
          </div>
        </header>

        <ol className="grid grid-cols-4 gap-3 sm:grid-cols-6 sm:gap-4 md:grid-cols-7">
          {levels.map((level, index) => (
            <li key={level.id}>
              <LevelItem
                levelNumber={index + 1}
                stars={level.stats?.stars ?? 0}
                status={level.status}
                theme={theme}
                onPlay={() => onSelect(level.id)}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
