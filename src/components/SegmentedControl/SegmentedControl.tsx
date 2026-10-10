import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export interface SegmentedOption<T> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

const trackStyles = cn(
  "inline-grid auto-cols-fr grid-flow-col gap-1 rounded-xl p-1",
  "border border-theme-950/5 bg-theme-950/8 backdrop-blur-md",
  "dark:border-theme-50/3",
  "dark:bg-[color-mix(in_oklab,color-mix(in_oklab,var(--color-theme-950)_80%,black)_70%,transparent)]",
);

const optionStyles = cn(
  "min-h-9 cursor-pointer rounded-lg px-3 text-sm font-medium transition-colors",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-theme-600 dark:focus-visible:outline-theme-300",
);

const selectedStyles = cn(
  "bg-theme-50/90 text-theme-950 shadow-sm",
  "dark:bg-theme-700/60 dark:text-theme-50 dark:shadow-none",
);

const idleStyles = cn(
  "text-theme-600 hover:bg-theme-950/5 hover:text-theme-900",
  "dark:text-theme-400 dark:hover:bg-theme-50/5 dark:hover:text-theme-200",
);

const KEY_STEP: Record<string, 1 | -1> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: SegmentedControlProps<T>) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  // If no option matches `value`, the first one stays reachable with Tab
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = options.length - 1;
    let next: number;

    if (event.key in KEY_STEP) {
      next =
        (selectedIndex + KEY_STEP[event.key] + options.length) % options.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    } else {
      return;
    }

    event.preventDefault();
    onChange(options[next].value);
    buttons.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={trackStyles}
    >
      {options.map((option, index) => {
        const selected = index === selectedIndex;
        return (
          <button
            key={option.value}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={cn(optionStyles, selected ? selectedStyles : idleStyles)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
