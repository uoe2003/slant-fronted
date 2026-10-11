import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LeagueConfig } from "../types";

interface LeagueSwitcherProps {
  league: LeagueConfig;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function LeagueSwitcher({
  league,
  canPrev,
  canNext,
  onPrev,
  onNext,
}: LeagueSwitcherProps) {
  const Icon = league.icon;

  return (
    <header className="sticky top-[calc(env(safe-area-inset-top,0px)+0.5rem)] z-40 pb-2">
      <div className="flex items-center justify-between rounded-2xl border border-theme-50/10 bg-theme-950/50 px-2 py-3 shadow-sm backdrop-blur-md">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Liga anterior"
          className="text-theme-400 hover:bg-theme-50/10!"
        >
          <ChevronLeft className="size-6" />
        </Button>

        <div
          key={league.id}
          className="flex animate-in items-center gap-2 duration-300 zoom-in-95"
        >
          <Icon aria-hidden="true" className={cn("size-5", league.color)} />
          <h1
            className={cn(
              "text-lg font-black tracking-widest uppercase",
              league.color,
            )}
          >
            {league.label}
          </h1>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Liga siguiente"
          className="text-theme-400 hover:bg-theme-50/10!"
        >
          <ChevronRight className="size-6" />
        </Button>
      </div>
    </header>
  );
}
