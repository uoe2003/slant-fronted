import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Variants

const iconTileVariants = cva("grid shrink-0 place-items-center", {
  variants: {
    tone: {
      theme: "bg-theme-300/15 text-theme-300",
      amber: "bg-amber-300/15 text-amber-300",
      active: "border border-theme-300/30 bg-theme-300/15 text-theme-200",
      inactive: "border border-theme-50/10 bg-theme-50/4 text-theme-50/25",
    },
    size: {
      md: "size-10 rounded-xl [&_svg]:size-5",
      lg: "size-14 rounded-2xl [&_svg]:size-6",
    },
  },
  defaultVariants: {
    tone: "theme",
    size: "md",
  },
});

// Types

interface IconTileProps
  extends
    Omit<ComponentProps<"span">, "children">,
    VariantProps<typeof iconTileVariants> {
  icon: LucideIcon;
}

// Component

function IconTile({
  icon: Icon,
  tone,
  size,
  className,
  ...props
}: IconTileProps) {
  return (
    <span
      className={cn(iconTileVariants({ tone, size }), className)}
      {...props}
    >
      <Icon aria-hidden="true" />
    </span>
  );
}

export { IconTile };
export type { IconTileProps };
