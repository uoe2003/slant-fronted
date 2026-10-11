import { Flame, Star, Trophy, Zap } from "lucide-react";
import type { PlayerStats } from "../types";
import { formatNumber } from "../utils/format";
import { StatTile } from "./StatTile";

interface StatHighlightsProps {
  stats: PlayerStats;
}

export function StatHighlights({ stats }: StatHighlightsProps) {
  return (
    <dl className="grid grid-cols-2 gap-3">
      <StatTile
        icon={Star}
        tone="amber"
        label="Estrellas"
        value={formatNumber(stats.stars)}
      />
      <StatTile
        icon={Trophy}
        label="Victorias"
        value={formatNumber(stats.wins)}
      />
      <StatTile
        icon={Flame}
        label="Racha actual"
        value={formatNumber(stats.currentStreak)}
      />
      <StatTile
        icon={Zap}
        label="Mejor puntuación"
        value={formatNumber(stats.bestScore)}
      />
    </dl>
  );
}
