import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TONES = {
  primary: "bg-primary/15 text-primary",
  orange: "bg-orange-500/15 text-orange-500",
  amber: "bg-amber-400/15 text-amber-400",
} as const;

interface StatRowProps {
  icon: LucideIcon;
  tone: keyof typeof TONES;
  label: string;
  value: ReactNode;
}

export function StatRow({ icon: Icon, tone, label, value }: StatRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-lg",
          TONES[tone],
        )}
      >
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <span className="flex-1 text-sm font-medium text-foreground">
        {label}
      </span>
      <span className="text-sm font-bold text-foreground tabular-nums">
        {value}
      </span>
    </div>
  );
}
