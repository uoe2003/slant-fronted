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
  // Altura: shadcn la fija con data-[size=default]:h-*, que gana a un `h-10` normal.
  "h-10 data-[size=default]:h-10",
  // Mismo aspecto que el <select> nativo: chevron a 12px del borde y 8px de separación
  "max-w-44 gap-2 rounded-full py-0 pr-3 pl-4 shadow-none",
  // `dark:` se repite porque shadcn define dark:bg-input/30 y dark:hover:bg-input/50
  "border border-white/10 bg-white/6 dark:bg-white/6 dark:hover:bg-white/6",
  "text-sm font-medium text-slate-100 data-placeholder:text-slate-400",
  "[&_svg]:size-4 [&_svg]:text-slate-400 [&_svg]:opacity-100",
  "scheme-dark focus-visible:border-white/10 focus-visible:ring-0",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300",
);

const contentStyles = cn(
  "min-w-40 rounded-2xl p-1.5",
  // Gris neutro translúcido + blur (sin tinte azul)
  "border border-white/10 bg-neutral-800/50 backdrop-blur-xl",
  "text-neutral-100 shadow-2xl shadow-black/40 ring-0",
  // Flechas de scroll arriba/abajo: shadcn les pone bg-popover (blanco en tema claro)
  "[&_[data-slot^=select-scroll]]:bg-transparent [&_[data-slot^=select-scroll]]:text-neutral-400",
);

const itemStyles = cn(
  // pl-2.5 + p-1.5 del contenido = 16px, igual que el pl-4 del trigger:
  // el texto queda alineado con el del trigger al abrir.
  "cursor-pointer rounded-xl py-2 pr-9 pl-2.5 text-sm text-neutral-300",
  "transition-colors",
  // Resaltado por teclado o ratón (ambas librerías usan data-highlighted)
  "focus:bg-white/10 focus:text-white",
  "data-highlighted:bg-white/10 data-highlighted:text-white",
  // Seleccionado: solo cambia el color, sin cambiar el peso (evita saltos de ancho)
  "data-selected:text-white data-[state=checked]:text-white",
  // Icono de check
  "[&_svg]:text-neutral-100",
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
