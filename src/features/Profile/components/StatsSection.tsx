import { SettingsRow } from "@/features/Settings/components/SettingsLayout/SettingsRow";
import { SettingsSection } from "@/features/Settings/components/SettingsLayout/SettingsSection";
import type { PlayerStats } from "../types";
import { formatNumber, formatPlayTime } from "../utils/format";
import { getWinRate } from "../utils/stats";

interface StatsSectionProps {
  stats: PlayerStats;
}

function RowValue({ children }: { children: string }) {
  return (
    <span className="text-[15px] font-semibold text-theme-50 tabular-nums">
      {children}
    </span>
  );
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <SettingsSection title="Estadísticas">
      <SettingsRow label="Partidas jugadas">
        <RowValue>{formatNumber(stats.gamesPlayed)}</RowValue>
      </SettingsRow>
      <SettingsRow label="Tasa de victorias">
        <RowValue>{`${getWinRate(stats.wins, stats.gamesPlayed)}%`}</RowValue>
      </SettingsRow>
      <SettingsRow label="Mejor racha">
        <RowValue>{formatNumber(stats.bestStreak)}</RowValue>
      </SettingsRow>
      <SettingsRow label="Tiempo de juego">
        <RowValue>{formatPlayTime(stats.playTimeMinutes)}</RowValue>
      </SettingsRow>
    </SettingsSection>
  );
}
