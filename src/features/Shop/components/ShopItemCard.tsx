import { Check } from "lucide-react";
import { AppButton } from "@/components/AppButton";
import { GlassCard } from "@/components/GlassCard";
import { IconTile } from "@/components/IconTile";
import type { PurchaseStatus, ShopItem } from "../types";
import { StarPrice } from "./StarPrice";

interface ShopItemCardProps {
  item: ShopItem;
  status: PurchaseStatus;
  ownedCount: number;
  onSelect: (item: ShopItem) => void;
}

export function ShopItemCard({
  item,
  status,
  ownedCount,
  onSelect,
}: ShopItemCardProps) {
  const isOwned = status === "owned";

  return (
    <li>
      <GlassCard className="flex h-full flex-col gap-3 rounded-2xl p-4">
        <div className="flex items-start justify-between">
          <IconTile
            icon={item.icon}
            size="lg"
            tone={isOwned ? "active" : "theme"}
          />
          {item.stackable && ownedCount > 0 && (
            <span className="text-xs font-semibold text-theme-300 tabular-nums">
              <span className="sr-only">Tienes </span>x{ownedCount}
            </span>
          )}
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="text-[15px] font-semibold text-theme-50">
            {item.name}
          </h3>
          <p className="text-[13px] leading-snug text-theme-500">
            {item.description}
          </p>
        </div>

        <AppButton
          size="sm"
          variant={status === "available" ? "primary" : "secondary"}
          disabled={isOwned}
          aria-haspopup="dialog"
          onClick={() => onSelect(item)}
          className="w-full"
        >
          {isOwned ? (
            <>
              <Check aria-hidden="true" />
              Conseguido
            </>
          ) : (
            <>
              <span className="sr-only">Comprar {item.name} por</span>
              <StarPrice amount={item.price} />
            </>
          )}
        </AppButton>
      </GlassCard>
    </li>
  );
}
