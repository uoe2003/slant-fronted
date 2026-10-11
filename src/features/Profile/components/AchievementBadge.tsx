import type { LucideIcon } from "lucide-react";
import { IconTile } from "@/components/IconTile";
import { cn } from "@/lib/utils";

interface AchievementBadgeProps {
  icon: LucideIcon;
  title: string;
  unlocked: boolean;
}

export function AchievementBadge({
  icon,
  title,
  unlocked,
}: AchievementBadgeProps) {
  return (
    <li className="flex flex-col items-center gap-1.5 text-center">
      <IconTile icon={icon} size="lg" tone={unlocked ? "active" : "inactive"} />
      <span
        className={cn(
          "text-xs leading-tight",
          unlocked ? "text-theme-200" : "text-theme-500",
        )}
      >
        {title}
        <span className="sr-only">
          {unlocked ? " (desbloqueado)" : " (bloqueado)"}
        </span>
      </span>
    </li>
  );
}
