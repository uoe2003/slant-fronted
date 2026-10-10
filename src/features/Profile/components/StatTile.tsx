import type { LucideIcon } from "lucide-react";

const ACCENT_STYLES = {
  star: "bg-amber-300/15 text-amber-300",
  theme: "bg-theme-300/15 text-theme-300",
} as const;

interface StatTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: keyof typeof ACCENT_STYLES;
}

/** Must be rendered inside a <dl>. */
export function StatTile({
  icon: Icon,
  label,
  value,
  accent = "theme",
}: StatTileProps) {
  return (
    <div className="rounded-2xl border border-theme-50/10 bg-theme-50/4 p-4 backdrop-blur-sm">
      <span
        className={`grid size-10 place-items-center rounded-xl ${ACCENT_STYLES[accent]}`}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="mt-3 flex flex-col-reverse">
        <dt className="text-[13px] text-theme-500">{label}</dt>
        <dd className="text-2xl font-bold text-theme-50 tabular-nums">
          {value}
        </dd>
      </div>
    </div>
  );
}
