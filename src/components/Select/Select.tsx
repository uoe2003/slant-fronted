import type { ComponentProps } from "react";

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  Select as SelectShadcn,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

type SelectBaseProps = Omit<
  ComponentProps<typeof SelectShadcn>,
  "items" | "children" | "value" | "defaultValue" | "onValueChange" | "multiple"
>;

export interface SelectProps<T extends string> extends SelectBaseProps {
  items: SelectOption<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  placeholder?: string;
  "aria-label"?: string;
  className?: string;
  contentClassName?: string;
}

const triggerStyles = cn(
  "h-10 data-[size=default]:h-10",
  "max-w-44 cursor-pointer gap-2 rounded-full py-0 pr-3 pl-4 shadow-none",
  "transition-colors",
  "border border-theme-950/10 bg-theme-950/5",
  "text-sm font-medium text-theme-900 data-placeholder:text-theme-600",
  // Keep the hover look while the menu is open (Radix / Base UI)
  "hover:border-theme-950/20 hover:bg-theme-950/10",
  "data-[state=open]:bg-theme-950/10 data-popup-open:bg-theme-950/10",
  "dark:border-theme-50/10 dark:bg-theme-50/6",
  "dark:text-theme-100 dark:data-placeholder:text-theme-400",
  "dark:hover:border-theme-50/20 dark:hover:bg-theme-50/10",
  "dark:data-[state=open]:bg-theme-50/10 dark:data-popup-open:bg-theme-50/10",
  "[&_svg]:size-4 [&_svg]:text-theme-600 [&_svg]:opacity-100",
  "dark:[&_svg]:text-theme-400",
  "scheme-light dark:scheme-dark",
  "focus-visible:border-theme-950/10 focus-visible:ring-0",
  "dark:focus-visible:border-theme-50/10",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-theme-600 dark:focus-visible:outline-theme-300",
);

const contentStyles = cn(
  "min-w-40 rounded-2xl p-1.5",
  "border border-theme-950/10 bg-theme-50/70 backdrop-blur-xl",
  "dark:border-theme-50/10 dark:bg-theme-950/60",
  "text-theme-900 shadow-2xl shadow-theme-950/20 ring-0",
  "dark:text-theme-100 dark:shadow-black/40",
  // shadcn sets bg-popover and w-full on the scroll arrows; w-full ignores
  "[&_[data-slot^=select-scroll]]:inset-x-0 [&_[data-slot^=select-scroll]]:w-auto",
  "[&_[data-slot^=select-scroll]]:flex [&_[data-slot^=select-scroll]]:items-center",
  "[&_[data-slot^=select-scroll]]:justify-center [&_[data-slot^=select-scroll]]:bg-transparent",
  "[&_[data-slot^=select-scroll]]:text-theme-600",
  "dark:[&_[data-slot^=select-scroll]]:text-theme-400",
);

const itemStyles = cn(
  // pl-2.5 + p-1.5 from the content = 16px, same as the trigger's pl-4
  "cursor-pointer rounded-xl py-2 pr-9 pl-2.5 text-sm",
  "text-theme-800 dark:text-theme-200",
  "transition-colors",
  "hover:bg-theme-950/10 hover:text-theme-950",
  "focus:bg-theme-950/10 focus:text-theme-950",
  "data-highlighted:bg-theme-950/10 data-highlighted:text-theme-950",
  "dark:hover:bg-theme-50/10 dark:hover:text-theme-50",
  "dark:focus:bg-theme-50/10 dark:focus:text-theme-50",
  "dark:data-highlighted:bg-theme-50/10 dark:data-highlighted:text-theme-50",
  // Color only, no font-weight change (avoids width jumps)
  "data-selected:text-theme-950 data-[state=checked]:text-theme-950",
  "dark:data-selected:text-theme-50 dark:data-[state=checked]:text-theme-50",
  "[&_svg]:text-theme-900 dark:[&_svg]:text-theme-100",
  "data-disabled:opacity-40",
);

export function Select<T extends string>({
  items,
  onValueChange,
  placeholder = "Selecciona una opción",
  "aria-label": ariaLabel,
  className,
  contentClassName,
  ...props
}: SelectProps<T>) {
  // La librería tipa el valor como `unknown`: lo volvemos a mapear a la opción
  // tipada en vez de usar un cast.
  function handleValueChange(next: unknown) {
    const option = items.find((item) => item.value === next);
    if (option) onValueChange?.(option.value);
  }

  return (
    <SelectShadcn items={items} onValueChange={handleValueChange} {...props}>
      <SelectTrigger
        aria-label={ariaLabel}
        className={cn(triggerStyles, className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn(contentStyles, contentClassName)}>
        <SelectGroup>
          {items.map(({ value, label, disabled }) => (
            <SelectItem
              key={value}
              value={value}
              disabled={disabled}
              className={itemStyles}
            >
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectShadcn>
  );
}
