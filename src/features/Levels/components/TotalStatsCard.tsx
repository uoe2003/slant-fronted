import { Star } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Progress } from "@/components/ui/progress";

interface TotalStatsCardProps {
  totalStars: number;
  maxStars: number;
}

export function TotalStatsCard({ totalStars, maxStars }: TotalStatsCardProps) {
  const percentage =
    maxStars > 0 ? Math.round((totalStars / maxStars) * 100) : 0;

  return (
    <GlassCard className="relative overflow-hidden shadow-lg">
      {/* Subtle golden ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-amber-400/20 blur-3xl"
      />

      <div className="relative flex items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 shadow-lg shadow-amber-400/20">
            <Star
              aria-hidden="true"
              className="size-6 fill-amber-400 text-amber-400"
            />
          </div>

          <div>
            <p className="mb-0.5 text-[10px] font-bold tracking-widest text-theme-400 uppercase">
              Total
            </p>
            <p className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tight text-theme-50 tabular-nums">
                {totalStars}
              </span>
              <span className="text-sm font-medium text-theme-400/60 tabular-nums">
                /{maxStars}
              </span>
            </p>
          </div>
        </div>

        <div className="flex min-w-30 flex-col items-end gap-1.5 sm:min-w-50">
          <span className="text-lg font-black text-theme-50 tabular-nums">
            {percentage}%
          </span>
          <Progress
            value={percentage}
            aria-label="Progreso total de estrellas"
            className="h-3 border border-theme-50/5 bg-theme-950/50 *:data-[slot=progress-indicator]:bg-amber-400"
          />
        </div>
      </div>
    </GlassCard>
  );
}
