import { SettingsSection } from "@/features/Settings/components/SettingsLayout/SettingsSection";
import { ACHIEVEMENTS } from "../consts/achievements";
import { AchievementBadge } from "./AchievementBadge";

interface AchievementsSectionProps {
  unlockedIds: string[];
}

export function AchievementsSection({ unlockedIds }: AchievementsSectionProps) {
  const unlocked = new Set(unlockedIds);
  const unlockedCount = ACHIEVEMENTS.filter(({ id }) =>
    unlocked.has(id),
  ).length;

  return (
    <SettingsSection title={`Logros (${unlockedCount}/${ACHIEVEMENTS.length})`}>
      <ul className="grid grid-cols-4 gap-x-2 gap-y-4 p-4">
        {ACHIEVEMENTS.map(({ id, title, icon }) => (
          <AchievementBadge
            key={id}
            icon={icon}
            title={title}
            unlocked={unlocked.has(id)}
          />
        ))}
      </ul>
    </SettingsSection>
  );
}
