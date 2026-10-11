import { ChevronRight, Swords } from "lucide-react";
import { glassSurface } from "@/components/GlassCard";
import { UserAvatar } from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import type { Player } from "../types";
import { RankTrend } from "./RankTrend";

interface PlayerRowProps {
  player: Player;
  onSelect: (player: Player) => void;
}

export function PlayerRow({ player, onSelect }: PlayerRowProps) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => onSelect(player)}
      className={cn(
        glassSurface,
        "group flex w-full items-center gap-3 p-3 text-left transition-all hover:bg-theme-50/10 focus-visible:outline-2 focus-visible:outline-primary active:scale-[0.98] hover:scale-104 cursor-pointer",
      )}
    >
      <span className="w-6 text-center font-mono text-sm font-bold text-muted-foreground">
        {player.rank}
      </span>

      <UserAvatar
        name={player.name}
        src={player.avatarUrl}
        className="size-10"
      />

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-foreground">
          {player.name}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Swords aria-hidden="true" className="size-3" />
          Nivel {player.level}
        </span>
      </span>

      <span className="flex flex-col items-end text-right">
        <span className="font-mono text-sm font-bold text-foreground">
          {player.score}
        </span>
        <RankTrend change={player.rankChange} />
      </span>

      <ChevronRight
        aria-hidden="true"
        className="size-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5"
      />
    </button>
  );
}
