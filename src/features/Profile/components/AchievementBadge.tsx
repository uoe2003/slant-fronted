import type { LucideIcon } from "lucide-react";

interface AchievementBadgeProps {
  icon: LucideIcon;
  title: string;
  unlocked: boolean;
}

export function AchievementBadge({
  icon: Icon,
  title,
  unlocked,
}: AchievementBadgeProps) {
  return (
    <li className="flex flex-col items-center gap-1.5 text-center">
      <span
        className={
          unlocked
            ? "grid size-14 place-items-center rounded-2xl border border-theme-300/30 bg-theme-300/15 text-theme-200"
            : "grid size-14 place-items-center rounded-2xl border border-theme-50/10 bg-theme-50/4 text-theme-50/25"
        }
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <span
        className={
          unlocked
            ? "text-xs leading-tight text-theme-200"
            : "text-xs leading-tight text-theme-500"
        }
      >
        {title}
        <span className="sr-only">
          {unlocked ? " (desbloqueado)" : " (bloqueado)"}
        </span>
      </span>
    </li>
  );
}
