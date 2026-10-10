import { cn } from "cn";
import { ChevronLeftIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface AppBarProps {
  title: string;
  onBack: () => void;
  /** Hides the back button, e.g. on a root screen. */
  hideBack?: boolean;
  /** Trailing elements, such as icon buttons or menus. */
  actions?: ReactNode;
}

export function AppBar({
  title,
  onBack,
  hideBack = false,
  actions,
}: AppBarProps) {
  return (
    // Three-column grid keeps the title centered regardless of side content
    // Transparent and inheriting color, so it adapts to whatever background the layout draws
    <header
      className={cn(
        "w-full grid shrink-0 grid-cols-[1fr_auto_1fr] items-center",
        "px-2 pt-[env(safe-area-inset-top)] min-h-[calc(3.5rem+env(safe-area-inset-top))]",
        "backdrop-blur-md border-b border-white/4",
      )}
    >
      <div className="flex min-w-0 items-center">
        {!hideBack && (
          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full text-inherit",
              "hover:bg-white/10 active:bg-white/15",
              "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-current",
            )}
            onClick={onBack}
            aria-label="Go back"
          >
            <ChevronLeftIcon />
          </button>
        )}
      </div>
      <h1 className="max-w-full text-lg font-bold tracking-tight truncate">
        {title}
      </h1>
      <div className="flex min-w-0 items-center justify-end">{actions}</div>
    </header>
  );
}
