import type { ComponentProps } from "react";

import { Slider as SliderShadcn } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type SliderBaseProps = Omit<
  ComponentProps<typeof SliderShadcn>,
  "value" | "defaultValue" | "onValueChange" | "children" | "className"
>;

export interface SliderProps extends SliderBaseProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  className?: string;
}

const rootStyles = cn(
  "flex h-4 w-full cursor-pointer items-center justify-center",
  "data-disabled:cursor-not-allowed",

  // Track
  "[&_[data-slot=slider-track]]:bg-theme-950/10",
  "dark:[&_[data-slot=slider-track]]:bg-theme-50/10",

  // Range
  "[&_[data-slot=slider-range]]:bg-theme-400",

  // Thumb
  "[&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:bg-theme-500",
  "[&_[data-slot=slider-thumb]]:border-theme-950/10 dark:[&_[data-slot=slider-thumb]]:border-theme-50/20",
  "[&_[data-slot=slider-thumb]]:cursor-grab [&_[data-slot=slider-thumb]]:active:cursor-grabbing",
  "[&_[data-slot=slider-thumb]]:shadow-md [&_[data-slot=slider-thumb]]:shadow-theme-950/25",
  "dark:[&_[data-slot=slider-thumb]]:shadow-black/40",
  "[&_[data-slot=slider-thumb]]:motion-reduce:transition-none",
  // Halo on hover and drag
  "[&_[data-slot=slider-thumb]]:ring-theme-950/10 dark:[&_[data-slot=slider-thumb]]:ring-theme-50/20",
  "[&_[data-slot=slider-thumb]]:focus-visible:ring-theme-600/50",
  "dark:[&_[data-slot=slider-thumb]]:focus-visible:ring-theme-300/50",
);

export function Slider({
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  className,
  ...props
}: SliderProps) {
  function handleValueChange(next: unknown) {
    const first: unknown = Array.isArray(next) ? next[0] : next;
    if (typeof first === "number") onValueChange?.(first);
  }

  const valueProps =
    value === undefined
      ? { defaultValue: [defaultValue ?? min] }
      : { value: [value] };

  return (
    <SliderShadcn
      min={min}
      max={max}
      onValueChange={handleValueChange}
      className={cn(rootStyles, className)}
      {...valueProps}
      {...props}
    />
  );
}
