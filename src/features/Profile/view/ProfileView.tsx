import { useState } from "react";
import { Flame, Star, Trophy, Zap } from "lucide-react";
import { SettingsRow } from "@/features/Settings/components/SettingsLayout/SettingsRow";
import { SettingsSection } from "@/features/Settings/components/SettingsLayout/SettingsSection";
import { AchievementBadge } from "../components/AchievementBadge";
import { EditProfileDrawer } from "../components/EditProfileDrawer";
import { ProfileHeader } from "../components/ProfileHeader";
import { StatTile } from "../components/StatTile";
import { ACHIEVEMENTS } from "../consts/achievements";
import { usePlayerStats } from "../hooks/usePlayerStats";
import { useProfileStore } from "../store/useProfileStore";
import { formatNumber, formatPlayTime } from "../../../utils/format";

function RowValue({ children }: { children: string }) {
  return (
    <span className="text-[15px] font-semibold text-theme-50 tabular-nums">
      {children}
    </span>
  );
}

export function ProfileView() {
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const stats = usePlayerStats();
  const [isEditing, setIsEditing] = useState(false);

  const winRate =
    stats.gamesPlayed > 0
      ? Math.round((stats.wins / stats.gamesPlayed) * 100)
      : 0;
  const unlockedIds = new Set(stats.unlockedAchievementIds);

  return (
    <div className="space-y-6">
      <ProfileHeader
        profile={profile}
        level={stats.level}
        xp={stats.xp}
        xpToNextLevel={stats.xpToNextLevel}
        onEdit={() => setIsEditing(true)}
      />

      <dl className="grid grid-cols-2 gap-3">
        <StatTile
          icon={Star}
          accent="star"
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

      <SettingsSection title="Estadísticas">
        <SettingsRow label="Partidas jugadas">
          <RowValue>{formatNumber(stats.gamesPlayed)}</RowValue>
        </SettingsRow>
        <SettingsRow label="Tasa de victorias">
          <RowValue>{`${winRate}%`}</RowValue>
        </SettingsRow>
        <SettingsRow label="Mejor racha">
          <RowValue>{formatNumber(stats.bestStreak)}</RowValue>
        </SettingsRow>
        <SettingsRow label="Tiempo de juego">
          <RowValue>{formatPlayTime(stats.playTimeMinutes)}</RowValue>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title={`Logros (${unlockedIds.size}/${ACHIEVEMENTS.length})`}
      >
        <ul className="grid grid-cols-4 gap-x-2 gap-y-4 p-4">
          {ACHIEVEMENTS.map(({ id, title, icon }) => (
            <AchievementBadge
              key={id}
              icon={icon}
              title={title}
              unlocked={unlockedIds.has(id)}
            />
          ))}
        </ul>
      </SettingsSection>

      <EditProfileDrawer
        open={isEditing}
        onOpenChange={setIsEditing}
        profile={profile}
        onSave={updateProfile}
      />
    </div>
  );
}
