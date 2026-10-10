import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatChipProps {
  icon: LucideIcon;
  value: number;
  total: number;
  /** Read by screen readers after the numbers, e.g. "niveles superados". */
  label: string;
  iconClassName?: string;
}

export function StatChip({
  icon: Icon,
  value,
  total,
  label,
  iconClassName,
}: StatChipProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-theme-50/10 bg-theme-50/4 py-1.5 pr-3 pl-2.5 text-sm font-semibold text-theme-50 tabular-nums">
      <Icon
        className={cn("size-4 text-theme-300", iconClassName)}
        aria-hidden="true"
      />
      <span>
        {value}
        <span className="font-medium text-theme-500">/{total}</span>
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
