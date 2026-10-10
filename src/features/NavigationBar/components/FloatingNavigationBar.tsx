import { cn } from "cn";
import type { ComponentProps } from "react";
import type { NavigationItemBaseProps } from "../types";
import { useActiveIndicator } from "../hooks/useActiveIndicator";

const ACTIVE_ITEM_SELECTOR =
  '[data-slot="floating-navigation-item"][aria-current="page"]';

const navStyles = cn(
  "fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] z-50 mx-auto",
  "flex w-fit items-center justify-center p-0.5 select-none",
  // Read by the indicator, the active item and the active badge
  "[--nav-active-color:var(--color-theme-500)] dark:[--nav-active-color:var(--color-theme-400)]",
);

// Sibling of the bar: nothing that animates lives inside the element
// with the backdrop-filter. inset-0.5 compensates the nav's p-0.5.
const glassStyles = cn(
  "pointer-events-none absolute inset-0.5 transform-gpu rounded-full border backdrop-blur-sm",
  "border-theme-950/10 bg-theme-950/4",
  "dark:border-theme-50/10 dark:bg-theme-50/4",
);

const barStyles = "relative flex items-center gap-1 rounded-full p-1.5";

const indicatorStyles = cn(
  "pointer-events-none absolute left-0 rounded-full opacity-0 transition-opacity duration-200",
  // Promoted to its own layer up front, so starting the animation
  // does not change the layer tree and drop the glass backdrop-filter
  "will-change-[transform,width]",
  "bg-[color-mix(in_oklab,var(--nav-active-color)_12%,transparent)]",
  "data-visible:opacity-100",
  "data-ready:transition-[transform,width,opacity] data-ready:duration-420 data-ready:ease-[cubic-bezier(0.34,1.3,0.64,1)]",
  "motion-reduce:transition-none",
);

const itemStyles = cn(
  "group relative flex min-w-14 cursor-pointer flex-col items-center justify-center",
  "rounded-full px-4 py-2 outline-none",
  "transition-[color,background-color,scale] duration-300",
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  "focus-visible:ring-theme-500 dark:focus-visible:ring-theme-400",
);

const activeItemStyles = "text-(--nav-active-color)";

const idleItemStyles = cn(
  "text-theme-600 hover:bg-theme-950/4 active:scale-95",
  "dark:text-theme-400 dark:hover:bg-theme-50/4",
);

const iconStyles = cn(
  "relative flex size-5 items-center justify-center [&_svg]:size-5",
  "motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105",
);

const badgeBaseStyles = cn(
  "absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1",
  "text-[10px] leading-none font-bold text-destructive-foreground",
);

export type FloatingNavigationBarProps = ComponentProps<"nav">;

export function FloatingNavigationBar({
  className,
  children,
  ...props
}: FloatingNavigationBarProps) {
  const { containerRef, indicatorRef } =
    useActiveIndicator(ACTIVE_ITEM_SELECTOR);

  return (
    <nav
      data-slot="floating-navigation-bar"
      aria-label="Floating navigation"
      className={cn(navStyles, className)}
      {...props}
    >
      <span
        aria-hidden
        data-slot="floating-navigation-glass"
        className={glassStyles}
      />
      <div ref={containerRef} className={barStyles}>
        {/* Sliding background; geometry is set by useActiveIndicator. */}
        <span
          ref={indicatorRef}
          aria-hidden
          data-slot="floating-navigation-indicator"
          className={indicatorStyles}
        />
        {children}
      </div>
    </nav>
  );
}

export type FloatingNavigationItemProps = NavigationItemBaseProps;

export function FloatingNavigationItem({
  active = false,
  icon,
  activeIcon,
  label,
  badge,
  className,
  ...props
}: FloatingNavigationItemProps) {
  const currentIcon = active && activeIcon ? activeIcon : icon;

  return (
    <button
      type="button"
      data-slot="floating-navigation-item"
      aria-current={active ? "page" : undefined}
      className={cn(
        itemStyles,
        active ? activeItemStyles : idleItemStyles,
        className,
      )}
      {...props}
    >
      <span className={iconStyles}>
        {currentIcon}

        {badge !== undefined && (
          <span
            className={cn(
              badgeBaseStyles,
              active ? "bg-(--nav-active-color)" : "bg-destructive",
            )}
          >
            {badge}
          </span>
        )}
      </span>

      {/* Constant weight: changing it would resize the item and shift the bar. */}
      <span className="mt-1 text-[11px] leading-none font-medium tracking-wide">
        {label}
      </span>
    </button>
  );
}
