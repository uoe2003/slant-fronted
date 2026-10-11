import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface RankTrendProps {
  change: number;
  className?: string;
}

const COLORS = {
  up: "text-emerald-500",
  down: "text-rose-500",
  same: "text-muted-foreground",
} as const;

const SR_LABELS = {
  up: " puestos ganados",
  down: " puestos perdidos",
  same: "Sin cambios",
} as const;

export function RankTrend({ change, className }: RankTrendProps) {
  const direction = change > 0 ? "up" : change < 0 ? "down" : "same";
  const label =
    direction === "up" ? `+${change}` : direction === "down" ? change : "-";

  return (
    <span
      className={cn(
        "flex items-center gap-0.5 text-[10px]",
        COLORS[direction],
        className,
      )}
    >
      {direction === "up" && (
        <TrendingUp aria-hidden="true" className="size-[1.2em]" />
      )}
      {direction === "down" && (
        <TrendingDown aria-hidden="true" className="size-[1.2em]" />
      )}
      <span aria-hidden="true">{label}</span>
      <span className="sr-only">
        {direction === "same"
          ? SR_LABELS.same
          : `${label}${SR_LABELS[direction]}`}
      </span>
    </span>
  );
}
