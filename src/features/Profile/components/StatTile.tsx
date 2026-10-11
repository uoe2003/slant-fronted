import type { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { IconTile, type IconTileProps } from "@/components/IconTile";

interface StatTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: IconTileProps["tone"];
}

/** Must be rendered inside a <dl>. */
export function StatTile({ icon, label, value, tone }: StatTileProps) {
  return (
    <GlassCard className="rounded-2xl p-4">
      <IconTile icon={icon} tone={tone} />
      <div className="mt-3 flex flex-col-reverse">
        <dt className="text-[13px] text-theme-500">{label}</dt>
        <dd className="text-2xl font-bold text-theme-50 tabular-nums">
          {value}
        </dd>
      </div>
    </GlassCard>
  );
}
