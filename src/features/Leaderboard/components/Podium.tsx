import type { LeagueConfig, Player } from "../types";
import { PodiumStep, type PodiumRank } from "./PodiumStep";

const PODIUM_RANKS: PodiumRank[] = [1, 2, 3];

interface PodiumProps {
  players: Player[];
  league: LeagueConfig;
  onSelect: (player: Player) => void;
}

export function Podium({ players, league, onSelect }: PodiumProps) {
  return (
    <section aria-label="Podio">
      {/* DOM order is 1-2-3 for screen readers; CSS order shows 2-1-3 */}
      <ol className="my-10 flex min-h-60 items-end justify-center gap-3 sm:gap-6">
        {PODIUM_RANKS.map((rank) => (
          <PodiumStep
            key={rank}
            rank={rank}
            league={league}
            player={players[rank - 1]}
            onSelect={onSelect}
          />
        ))}
      </ol>
    </section>
  );
}
