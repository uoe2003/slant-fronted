import { useState } from "react";
import { CategoryFilter } from "../components/CategoryFilter";
import { PurchaseDrawer } from "../components/PurchaseDrawer";
import { ShopItemCard } from "../components/ShopItemCard";
import { StarBalance } from "../components/StarBalance";
import { SHOP_ITEMS } from "../consts/items";
import { useShopStore } from "../store/useShopStore";
import type { ShopFilterId, ShopItem } from "../types";
import { getPurchaseStatus } from "../utils/purchase";

export function ShopView() {
  const stars = useShopStore((state) => state.stars);
  const inventory = useShopStore((state) => state.inventory);
  const purchase = useShopStore((state) => state.purchase);

  const [filter, setFilter] = useState<ShopFilterId>("all");
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const visibleItems =
    filter === "all"
      ? SHOP_ITEMS
      : SHOP_ITEMS.filter((item) => item.category === filter);

  function handleSelect(item: ShopItem) {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  }

  function handleConfirm(item: ShopItem) {
    if (purchase(item)) setIsDrawerOpen(false);
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-theme-50">
          Tienda
        </h1>
        <StarBalance stars={stars} />
      </header>

      <CategoryFilter value={filter} onChange={setFilter} />

      <section>
        <h2 className="sr-only">Artículos</h2>
        <ul className="grid grid-cols-2 gap-3">
          {visibleItems.map((item) => {
            const ownedCount = inventory[item.id] ?? 0;

            return (
              <ShopItemCard
                key={item.id}
                item={item}
                ownedCount={ownedCount}
                status={getPurchaseStatus(item, stars, ownedCount)}
                onSelect={handleSelect}
              />
            );
          })}
        </ul>
      </section>

      <PurchaseDrawer
        item={selectedItem}
        open={isDrawerOpen}
        stars={stars}
        ownedCount={selectedItem ? (inventory[selectedItem.id] ?? 0) : 0}
        onOpenChange={setIsDrawerOpen}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
