import { AppButton } from "@/components/AppButton";
import { SHOP_FILTERS } from "../consts/filters";
import type { ShopFilterId } from "../types";

interface CategoryFilterProps {
  value: ShopFilterId;
  onChange: (value: ShopFilterId) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Categorías" className="flex flex-wrap gap-2">
      {SHOP_FILTERS.map(({ id, label }) => {
        const selected = id === value;

        return (
          <AppButton
            key={id}
            size="sm"
            variant={selected ? "primary" : "secondary"}
            aria-pressed={selected}
            onClick={() => onChange(id)}
            className="rounded-full"
          >
            {label}
          </AppButton>
        );
      })}
    </div>
  );
}
