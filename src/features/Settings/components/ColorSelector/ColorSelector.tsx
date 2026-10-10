import { useId } from "react";
import { cn } from "@/lib/utils";
import { ColorSwatch } from "./ColorSwatch";

export interface ColorOption<T extends string> {
  value: T;
  /** Accessible name of the color. */
  label: string;
  /** Any valid CSS color. */
  color: string;
}

interface ColorSelectorProps<T extends string> {
  /** Accessible name of the whole group. */
  label: string;
  options: ColorOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function ColorSelector<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: ColorSelectorProps<T>) {
  const groupName = useId();

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "flex snap-x gap-2 overflow-x-auto p-1.5 scrollbar-none [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {options.map((option) => (
        <ColorSwatch
          key={option.value}
          groupName={groupName}
          label={option.label}
          color={option.color}
          selected={option.value === value}
          onSelect={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}
