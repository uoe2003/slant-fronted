import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatChipProps {
  icon: LucideIcon;
  iconClassName?: string;
  value: number;
  total: number;
  label: string;
}

export function StatChip({
  icon: Icon,
  iconClassName,
  value,
  total,
  label,
}: StatChipProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-theme-50/10 bg-theme-950/40 px-3 py-1.5">
      <Icon
        aria-hidden="true"
        className={cn("size-4 text-theme-400", iconClassName)}
      />
      <span className="text-sm font-bold text-theme-50">
        {value}
        <span className="text-xs text-theme-400/70">/{total}</span>
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
