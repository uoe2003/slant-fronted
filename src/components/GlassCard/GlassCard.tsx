import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const glassSurface =
  "rounded-2xl border border-theme-50/10 bg-theme-50/4 backdrop-blur-sm";

export function GlassCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card"
      className={cn(glassSurface, className)}
      {...props}
    />
  );
}
