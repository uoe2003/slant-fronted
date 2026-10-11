import { UserAvatar } from "@/components/UserAvatar";
import type { Player } from "../types";
import { cn } from "cn";
import { glassSurface } from "@/components/GlassCard";

interface UserRankBarProps {
  player: Player;
  totalPlayers: number;
  onSelect: (player: Player) => void;
}

export function UserRankBar({
  player,
  totalPlayers,
  onSelect,
}: UserRankBarProps) {
  const topPercent = Math.max(1, Math.ceil((player.rank / totalPlayers) * 100));

  return (
    // Bottom offset keeps the bar above the floating navigation bar
    <div className="sticky bottom-[calc(6rem+env(safe-area-inset-bottom,0px))] z-20 mt-3 lg:bottom-8">
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => onSelect(player)}
        className={cn(
          glassSurface,
          "flex w-full animate-in items-center gap-3 rounded-2xl border border-theme-300/50 bg-theme-950 p-3 pl-4 text-left transition-transform slide-in-from-bottom-10 focus-visible:outline-2 focus-visible:outline-primary active:scale-[0.98]",
        )}
      >
        <span className="flex w-8 text-lg leading-none font-black text-theme-400">
          {player.rank}
        </span>

        <span aria-hidden="true" className="h-8 w-px bg-border" />

        <UserAvatar
          name={player.name}
          src={player.avatarUrl}
          className="size-10 border-2 border-primary"
        />

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold text-theme-400">
            Tú
          </span>
          <span className="block text-[10px] text-theme-50">
            Top {topPercent}%
          </span>
        </span>

        <span className="rounded-lg border border-theme-300/50 bg-theme-300/10 px-3 py-1.5 text-sm font-black text-theme-300 tabular-nums">
          {player.score}
        </span>
      </button>
    </div>
  );
}
