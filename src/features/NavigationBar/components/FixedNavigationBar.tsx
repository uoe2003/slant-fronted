import { cn } from "cn";
import type { ComponentProps } from "react";
import type { NavigationItemBaseProps } from "../types";

const navStyles = cn(
  // Mobile / Tablet: bottom bar
  "relative z-40 flex h-20 w-full shrink-0 items-center justify-around px-2 pb-[env(safe-area-inset-bottom,0px)] select-none",
  "border-t border-theme-950/10 bg-theme-50/60 backdrop-blur-sm",
  "shadow-[0_-1px_3px_color-mix(in_oklab,var(--color-theme-950)_3%,transparent)]",
  "dark:border-theme-50/4 dark:bg-theme-950/50 dark:shadow-none",
  // Read by the active item, its pill and the focus ring
  "[--nav-active-color:var(--color-theme-500)] dark:[--nav-active-color:var(--color-theme-400)]",
  "md:justify-center md:gap-4 md:px-6 md:pb-0",
  // Desktop: side rail
  "lg:order-first lg:h-full lg:w-20 lg:flex-col lg:justify-start lg:gap-5 lg:border-t-0 lg:border-r lg:px-2 lg:py-6",
);

const listStyles = cn(
  "mx-auto flex w-full max-w-md items-center justify-around",
  "md:max-w-3xl md:justify-center md:gap-3",
  "lg:max-w-none lg:flex-col lg:gap-4",
);

const itemStyles = cn(
  "group relative flex min-w-16 cursor-pointer flex-col items-center justify-center",
  "rounded-2xl py-1 outline-none select-none",
  "transition-transform duration-150 active:scale-95 motion-reduce:transition-none",
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  "focus-visible:ring-theme-500 dark:focus-visible:ring-theme-400",
);

const pillBaseStyles = cn(
  "absolute inset-0 rounded-full",
  "transition-[scale,opacity,background-color] duration-300 ease-[cubic-bezier(0.2,0,0.4,1)] motion-reduce:transition-none",
);

const pillActiveStyles = cn(
  "scale-x-100 opacity-100",
  "bg-[color-mix(in_oklab,var(--nav-active-color)_15%,transparent)]",
  "dark:bg-[color-mix(in_oklab,var(--nav-active-color)_20%,transparent)]",
);

const pillIdleStyles = cn(
  "pointer-events-none scale-x-40 bg-transparent opacity-0",
  "group-hover:scale-x-90 group-hover:bg-theme-950/6 group-hover:opacity-100",
  "dark:group-hover:bg-theme-50/6",
);

const iconBaseStyles = cn(
  "relative z-10 flex size-6 items-center justify-center [&_svg]:size-6",
  "transition-colors duration-200",
);

const iconActiveStyles = "text-(--nav-active-color)";

const iconIdleStyles = cn(
  "text-theme-600 group-hover:text-theme-900",
  "dark:text-theme-400 dark:group-hover:text-theme-200",
);

const labelBaseStyles =
  "mt-1 text-[12px] leading-none font-medium tracking-[0.2px] transition-colors duration-200";

const labelActiveStyles = "font-semibold text-theme-950 dark:text-theme-50";

const labelIdleStyles = cn(
  "text-theme-600 group-hover:text-theme-900",
  "dark:text-theme-400 dark:group-hover:text-theme-200",
);

const badgeStyles = cn(
  "absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1",
  "bg-destructive text-[10px] leading-none font-bold text-destructive-foreground shadow-xs",
);

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
      className={cn(navStyles, className)}
      {...props}
    >
      <div className={listStyles}>{children}</div>
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
      className={cn(itemStyles, className)}
      {...props}
    >
      <div className="relative flex h-8 w-16 items-center justify-center">
        <span
          aria-hidden
          className={cn(
            pillBaseStyles,
            active ? pillActiveStyles : pillIdleStyles,
          )}
        />

        <span
          className={cn(
            iconBaseStyles,
            active ? iconActiveStyles : iconIdleStyles,
          )}
        >
          {currentIcon}

          {badge !== undefined && <span className={badgeStyles}>{badge}</span>}
        </span>
      </div>

      <span
        className={cn(
          labelBaseStyles,
          active ? labelActiveStyles : labelIdleStyles,
        )}
      >
        {label}
      </span>
    </button>
  );
}
