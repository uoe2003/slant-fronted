import { Crown } from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import type { LeagueConfig, Player } from "../types";

export type PodiumRank = 1 | 2 | 3;

const STEP_STYLES = {
  1: {
    item: "order-2 relative z-20 -mx-2",
    avatar: "h-20 w-20 border-4 shadow-xl mb-3",
    name: "text-sm font-black",
    pedestal: "h-36 pt-5 shadow-lg",
    rank: "text-4xl font-black opacity-90",
    score:
      "relative z-10 mt-1 rounded-full border border-white/10 bg-background/40 px-3 py-0.5 font-mono text-xs font-bold text-foreground backdrop-blur-sm",
  },
  2: {
    item: "order-1 relative z-10",
    avatar: "h-14 w-14 border-2 shadow-lg mb-2",
    name: "text-xs font-bold",
    pedestal: "h-24 pt-2",
    rank: "text-2xl font-black opacity-30",
    score: "font-mono text-[10px] font-medium text-foreground/80",
  },
  3: {
    item: "order-3 relative z-10",
    avatar: "h-14 w-14 border-2 shadow-lg mb-2",
    name: "text-xs font-bold",
    pedestal: "h-20 pt-2",
    rank: "text-2xl font-black opacity-30",
    score: "font-mono text-[10px] font-medium text-foreground/80",
  },
} as const;

interface PodiumStepProps {
  rank: PodiumRank;
  league: LeagueConfig;
  onSelect: (player: Player) => void;
  player?: Player;
}

export function PodiumStep({
  rank,
  league,
  onSelect,
  player,
}: PodiumStepProps) {
  const styles = STEP_STYLES[rank];
  const isChampion = rank === 1;
  const LeagueIcon = league.icon;

  if (!player)
    return <li aria-hidden="true" className={cn("w-1/3", styles.item)} />;

  return (
    <li className={cn("w-1/3 min-w-0", styles.item)}>
      {isChampion && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -top-8 flex animate-bounce justify-center"
        >
          <Crown
            className={cn("size-9 fill-current drop-shadow-lg", league.color)}
          />
        </span>
      )}

      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => onSelect(player)}
        className="flex w-full flex-col items-center rounded-xl transition-transform focus-visible:outline-2 focus-visible:outline-primary active:scale-[0.97]"
      >
        <UserAvatar
          name={player.name}
          src={player.avatarUrl}
          className={cn(
            "bg-background",
            styles.avatar,
            league.border,
            isChampion && league.shadow,
          )}
        />

        <span
          className={cn(
            "mb-1 block w-full truncate text-center text-foreground",
            styles.name,
          )}
        >
          {player.name}
        </span>

        <span
          className={cn(
            "relative flex w-full flex-col items-center justify-start overflow-hidden rounded-t-xl border-x border-t backdrop-blur-md",
            league.podiumGlass,
            styles.pedestal,
            isChampion && league.shadow,
          )}
        >
          {isChampion && (
            <>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-white/40"
              />
              <LeagueIcon
                aria-hidden="true"
                className={cn(
                  "absolute -right-4 -bottom-4 size-24 rotate-12",
                  league.iconColor,
                )}
              />
            </>
          )}
          <span className={cn(styles.rank, isChampion && league.color)}>
            {rank}
          </span>
          <span className={styles.score}>{player.score}</span>
        </span>
      </button>
    </li>
  );
}
