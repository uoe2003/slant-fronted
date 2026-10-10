import { cn } from "cn";
import type { ComponentProps } from "react";
import type { NavigationItemBaseProps } from "../types";

export type FixedNavigationBarProps = ComponentProps<"nav">;

export function FixedNavigationBar({
  className,
  children,
  ...props
}: FixedNavigationBarProps) {
  return (
    <nav
      data-slot="navigation-bar"
      aria-label="Main navigation"
      className={cn(
        // Mobile / Tablet: bottom bar
        "relative z-40 flex h-20 w-full shrink-0 items-center justify-around border-t border-white/4 backdrop-blur-md px-2 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-1px_3px_rgba(0,0,0,0.03)] select-none dark:bg-card/85 dark:shadow-none",
        "md:justify-center md:gap-4 md:px-6 md:pb-0",
        // Desktop: side rail
        "lg:order-first lg:h-full lg:w-20 lg:flex-col lg:justify-start lg:gap-5 lg:border-t-0 lg:border-r lg:px-2 lg:py-6",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-md items-center justify-around md:max-w-3xl md:justify-center md:gap-3 lg:max-w-none lg:flex-col lg:gap-4">
        {children}
      </div>
    </nav>
  );
}

export type FixedNavigationItemProps = NavigationItemBaseProps;

export function FixedNavigationItem({
  active = false,
  icon,
  activeIcon,
  label,
  badge,
  className,
  ...props
}: FixedNavigationItemProps) {
  const currentIcon = active && activeIcon ? activeIcon : icon;

  return (
    <button
      type="button"
      data-slot="navigation-item"
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex min-w-16 flex-col items-center justify-center",
        "rounded-2xl py-1 outline-none cursor-pointer",
        "transition-transform duration-150 select-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.95]",
        className,
      )}
      {...props}
    >
      <div className="relative flex h-8 w-16 items-center justify-center">
        {/* Active pill indicator */}
        <span
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
            active
              ? "scale-x-100 bg-primary/15 opacity-100 dark:bg-primary/20"
              : "pointer-events-none scale-x-40 bg-transparent opacity-0 group-hover:scale-x-90 group-hover:bg-muted/40 group-hover:opacity-100",
          )}
        />

        <span
          className={cn(
            "relative z-10 flex size-6 items-center justify-center transition-colors duration-200 [&_svg]:size-6",
            active
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground",
          )}
        >
          {currentIcon}

          {badge !== undefined && (
            <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] leading-none font-bold text-destructive-foreground shadow-xs">
              {badge}
            </span>
          )}
        </span>
      </div>

      <span
        className={cn(
          "mt-1 text-[12px] leading-none font-medium tracking-[0.2px] transition-colors duration-200",
          active
            ? "font-semibold text-foreground"
            : "text-muted-foreground group-hover:text-foreground",
        )}
      >
        {label}
      </span>
    </button>
  );
}
