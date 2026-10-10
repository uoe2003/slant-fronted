import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ModeAccent, OnlineGameMode } from "../types";

const ACCENT_STYLES: Record<
  ModeAccent,
  { card: string; chip: string; watermark: string }
> = {
  emerald: {
    card: "border-emerald-400/20 bg-emerald-400/6",
    chip: "bg-emerald-400/15 text-emerald-300 shadow-2xl shadow-emerald-500/25",
    watermark: "text-emerald-300/10",
  },
  violet: {
    card: "border-violet-400/20 bg-violet-400/6",
    chip: "bg-violet-400/15 text-violet-300 shadow-2xl shadow-violet-500/25",
    watermark: "text-violet-300/10",
  },
  rose: {
    card: "border-rose-400/20 bg-rose-400/6",
    chip: "bg-rose-400/15 text-rose-300 shadow-2xl shadow-rose-500/25",
    watermark: "text-rose-300/10",
  },
};

interface OnlineModeCardProps {
  mode: OnlineGameMode;
}

export function OnlineModeCard({ mode }: OnlineModeCardProps) {
  const { icon: Icon, title, description, path, available, accent } = mode;
  const styles = ACCENT_STYLES[accent];
  const cardClass = cn(
    "relative block overflow-hidden rounded-3xl border-2 p-5 backdrop-blur-sm",
    styles.card,
  );

  const content = (
    <>
      <Icon
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-2 -bottom-2 size-25 -rotate-12",
          styles.watermark,
        )}
      />
      <div className="relative flex items-center gap-4">
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-2xl border",
            styles.chip,
          )}
        >
          <Icon className="size-6" aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-[17px] font-semibold text-theme-50">{title}</h3>
            {!available && (
              <Badge
                variant="secondary"
                className="bg-theme-50/10 text-theme-300"
              >
                Próximamente
              </Badge>
            )}
          </div>
          <p className="mt-0.5 text-[13px] text-theme-400">{description}</p>
        </div>

        {available && (
          <ChevronRight
            className="size-5 shrink-0 text-theme-500"
            aria-hidden="true"
          />
        )}
      </div>
    </>
  );

  if (!available) {
    return (
      <div aria-disabled="true" className={cardClass}>
        {content}
      </div>
    );
  }

  return (
    <Link
      to={path}
      className={cn(
        cardClass,
        "transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-theme-300",
      )}
    >
      {content}
    </Link>
  );
}
