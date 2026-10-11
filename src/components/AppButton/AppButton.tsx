import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Style overrides

const overrides = cva(
  "gap-2 font-semibold focus-visible:border-theme-300 focus-visible:ring-theme-300/40 active:scale-[0.98] motion-reduce:active:scale-100 data-loading:disabled:opacity-100",
  {
    variants: {
      variant: {
        primary: "bg-theme-300 text-theme-950 hover:bg-theme-200",
        // The dark: classes cancel the shadcn dark defaults for outline and ghost
        secondary: [
          "border-theme-50/10 bg-theme-50/4 text-theme-100 hover:bg-theme-50/10 hover:text-theme-100",
          "dark:border-theme-50/10 dark:bg-theme-50/4 dark:hover:bg-theme-50/10",
        ],
        ghost: [
          "text-theme-300 hover:bg-theme-50/10 hover:text-theme-300",
          "dark:hover:bg-theme-50/10",
        ],
        destructive: "",
      },
      size: {
        sm: "h-9 rounded-xl px-3.5 text-sm",
        md: "h-11 rounded-2xl px-5 text-sm",
        lg: "h-12 rounded-2xl px-6 text-[15px] [&_svg:not([class*='size-'])]:size-5",
        icon: "size-11 rounded-full p-0",
        "icon-sm": "size-8 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

// Types

type ShadcnButtonProps = ComponentProps<typeof Button>;
type AppButtonVariant = NonNullable<VariantProps<typeof overrides>["variant"]>;
type AppButtonSize = NonNullable<VariantProps<typeof overrides>["size"]>;

interface AppButtonProps extends Omit<ShadcnButtonProps, "variant" | "size"> {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  loading?: boolean;
}

// Shadcn mapping

const baseVariant = {
  primary: "default",
  secondary: "outline",
  ghost: "ghost",
  destructive: "destructive",
} as const satisfies Record<
  AppButtonVariant,
  NonNullable<ShadcnButtonProps["variant"]>
>;

const baseSize = {
  sm: "sm",
  md: "default",
  lg: "lg",
  icon: "icon",
  "icon-sm": "icon-sm",
} as const satisfies Record<
  AppButtonSize,
  NonNullable<ShadcnButtonProps["size"]>
>;

// Class helper for non-button elements (e.g. links)

function appButtonVariants({
  variant = "primary",
  size = "md",
}: { variant?: AppButtonVariant; size?: AppButtonSize } = {}) {
  return cn(
    buttonVariants({ variant: baseVariant[variant], size: baseSize[size] }),
    overrides({ variant, size }),
  );
}

// Component

function AppButton({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: AppButtonProps) {
  const isIconOnly = size === "icon" || size === "icon-sm";

  return (
    <Button
      variant={baseVariant[variant]}
      size={baseSize[size]}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      className={cn(overrides({ variant, size }), className)}
      {...props}
    >
      {loading && <LoaderCircle aria-hidden="true" className="animate-spin" />}
      {!(loading && isIconOnly) && children}
    </Button>
  );
}

export { AppButton, appButtonVariants };
export type { AppButtonProps };
