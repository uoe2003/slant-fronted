import { cn } from "cn";
import type { ComponentProps, CSSProperties } from "react";
import type { NavigationItemBaseProps } from "../types";
import { useActiveIndicator } from "../hooks/useActiveIndicator";

const ACTIVE_ITEM_SELECTOR =
  '[data-slot="floating-navigation-item"][aria-current="page"]';

export type FloatingNavigationBarProps = ComponentProps<"nav"> & {
  /** Any valid CSS color. Defaults to the theme's primary color. */
  activeColor?: string;
};

export function FloatingNavigationBar({
  className,
  activeColor,
  style,
  children,
  ...props
}: FloatingNavigationBarProps) {
  const { containerRef, indicatorRef } =
    useActiveIndicator(ACTIVE_ITEM_SELECTOR);

  return (
    <nav
      data-slot="floating-navigation-bar"
      aria-label="Floating navigation"
      // Items and the indicator read the color through this variable.
      style={
        {
          "--nav-active-color": activeColor ?? "var(--primary)",
          ...style,
        } as CSSProperties
      }
      className={cn(
        "fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] z-50 mx-auto flex w-fit items-center justify-center p-0.5 select-none",
        className,
      )}
      {...props}
    >
      <div
        ref={containerRef}
        className="relative flex items-center gap-1 rounded-full border border-white/10 bg-white/4 p-1.5 text-card-foreground backdrop-blur-sm"
      >
        {/* Sliding background; geometry is set by useActiveIndicator. */}
        <span
          ref={indicatorRef}
          aria-hidden
          data-slot="floating-navigation-indicator"
          className={cn(
            "pointer-events-none absolute left-0 rounded-full opacity-0 transition-opacity duration-200",
            "bg-[color-mix(in_oklab,var(--nav-active-color)_12%,transparent)]",
            "data-visible:opacity-100",
            "data-ready:transition-[transform,width,opacity] data-ready:duration-420 data-ready:ease-[cubic-bezier(0.34,1.3,0.64,1)]",
            "motion-reduce:transition-none",
          )}
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
        "group relative flex min-w-14 flex-col items-center justify-center",
        "rounded-full px-4 py-2 outline-none cursor-pointer",
        "transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2",
        active
          ? "text-(--nav-active-color)"
          : "text-muted-foreground hover:bg-white/4 active:scale-95",
        className,
      )}
      {...props}
    >
      <span className="relative flex size-5 items-center justify-center transition-transform duration-300 group-hover:scale-105 [&_svg]:size-5">
        {currentIcon}

        {badge !== undefined && (
          <span
            className={cn(
              "absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-bold text-destructive-foreground",
              active ? "bg-(--nav-active-color)" : "bg-destructive",
            )}
          >
            {badge}
          </span>
        )}
      </span>

      {/* Constant weight: changing it would resize the item and shift the bar. */}
      <span
        className={cn(
          "mt-1 text-[11px] leading-none font-medium tracking-wide transition-colors duration-300",
          !active && "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </button>
  );
}
