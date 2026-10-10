import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

const trackStyles = cn(
  "relative h-7 w-12 shrink-0 cursor-pointer rounded-full ring-1 ring-inset",
  "transition-colors duration-200 motion-reduce:transition-none",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-theme-600 dark:focus-visible:outline-theme-300",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

const onStyles = cn(
  "bg-theme-500 ring-theme-950/10 hover:bg-theme-600",
  "dark:bg-theme-500 dark:ring-theme-50/10 dark:hover:bg-theme-400",
);

const offStyles = cn(
  "bg-theme-950/15 ring-theme-950/5 hover:bg-theme-950/20",
  // Same dark mix as the SegmentedControl track
  "dark:bg-[color-mix(in_oklab,var(--color-theme-950)_80%,black)]",
  "dark:ring-theme-50/10 dark:hover:ring-theme-50/20",
);

const thumbStyles = cn(
  "absolute top-0.5 left-0.5 size-6 rounded-full shadow-sm",
  "transition-[translate,background-color] duration-200 motion-reduce:transition-none",
);

const thumbOnStyles = "translate-x-5 bg-theme-50";
const thumbOffStyles = "translate-x-0 bg-theme-50 dark:bg-theme-400";

export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(trackStyles, checked ? onStyles : offStyles)}
    >
      <span
        aria-hidden="true"
        className={cn(thumbStyles, checked ? thumbOnStyles : thumbOffStyles)}
      />
    </button>
  );
}
