import { Lock, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LevelStatus } from "@/stores/useGameLevelStore/type";
import { MAX_STARS_PER_LEVEL } from "../consts/levels";
import type { LevelTheme } from "../types";

const STAR_SLOTS = Array.from({ length: MAX_STARS_PER_LEVEL }, (_, i) => i + 1);
// Outer stars sit lower than the middle one to form a small arc
const MIDDLE_STAR = Math.ceil(MAX_STARS_PER_LEVEL / 2);

interface LevelItemProps {
  levelNumber: number;
  stars: number;
  status: LevelStatus;
  theme: LevelTheme;
  onPlay: () => void;
}

function getAriaLabel(levelNumber: number, status: LevelStatus, stars: number) {
  if (status === "locked") return `Nivel ${levelNumber}, bloqueado`;
  if (status === "completed") {
    return `Nivel ${levelNumber}, ${stars} de ${MAX_STARS_PER_LEVEL} estrellas`;
  }
  return `Nivel ${levelNumber}, siguiente nivel`;
}

export function LevelItem({
  levelNumber,
  stars,
  status,
  theme,
  onPlay,
}: LevelItemProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isCurrent = status === "current";

  return (
    <button
      type="button"
      onClick={onPlay}
      disabled={isLocked}
      aria-label={getAriaLabel(levelNumber, status, stars)}
      aria-current={isCurrent ? "step" : undefined}
      className={cn(
        "relative flex aspect-square w-full flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-theme-300",

        isLocked &&
          "cursor-not-allowed border-theme-50/5 bg-theme-50/5 text-theme-400/30",

        (isCompleted || isCurrent) &&
          "cursor-pointer bg-theme-900/30 backdrop-blur-md hover:scale-105 active:scale-95",

        isCompleted && cn(theme.bg, theme.border),

        isCurrent &&
          cn(
            "shadow-[0_0_20px_currentColor] ring-2 ring-offset-2 ring-offset-theme-950",
            theme.border,
            theme.glow,
          ),
      )}
    >
      <div className="z-10 flex flex-col items-center gap-1">
        {isLocked ? (
          <Lock aria-hidden="true" className="size-6 opacity-40" />
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              "font-mono font-black drop-shadow-sm",
              isCurrent
                ? cn("text-3xl", theme.color)
                : "text-2xl text-theme-50",
              isCompleted && "pt-3",
            )}
          >
            {levelNumber}
          </span>
        )}
      </div>

      {isCompleted && (
        <div aria-hidden="true" className="absolute top-2.5 flex gap-0.5">
          {STAR_SLOTS.map((slot) => (
            <Star
              key={slot}
              className={cn(
                "size-3 fill-amber-400 text-amber-400 transition-colors duration-500",
                slot !== MIDDLE_STAR && "mt-1",
                slot <= stars ? "drop-shadow-sm" : "opacity-20",
              )}
            />
          ))}
        </div>
      )}

      {isCurrent && (
        <div
          aria-hidden="true"
          className="absolute -top-2 -right-2 animate-bounce rounded-full bg-theme-50 p-1.5 text-theme-950 shadow-lg"
        >
          <Play className="size-2.5 fill-current" />
        </div>
      )}
    </button>
  );
}
