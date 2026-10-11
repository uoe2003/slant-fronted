import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Style overrides

const overrides = cva(
  "gap-2 font-bold active:scale-[0.98] motion-reduce:active:scale-100 data-loading:disabled:opacity-100",
  {
    variants: {
      variant: {
        primary: [
          "bg-theme-600 text-theme-50 shadow-md shadow-theme-600/20 hover:bg-theme-700",
          "dark:bg-theme-400 dark:text-theme-950 dark:shadow-theme-400/20 dark:hover:bg-theme-300",
        ],
        secondary: [
          "bg-theme-100 text-theme-900 hover:bg-theme-200",
          "dark:bg-theme-900 dark:text-theme-50 dark:hover:bg-theme-800",
        ],
        glass: [
          "border-theme-200/60 bg-theme-50/60 text-foreground backdrop-blur-sm hover:bg-theme-50/80",
          "dark:border-theme-800/60 dark:bg-theme-950/60 dark:hover:bg-theme-950/80",
        ],
        ghost: "text-foreground hover:bg-theme-950/5 dark:hover:bg-theme-50/10",
        destructive: "",
      },
      size: {
        sm: "h-9 rounded-xl px-3.5 text-sm",
        md: "h-11 rounded-2xl px-5 text-sm",
        lg: "h-12 rounded-2xl px-6 text-base [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10 rounded-full p-0",
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
  secondary: "secondary",
  glass: "outline",
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
