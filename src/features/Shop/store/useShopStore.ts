import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ShopItem } from "../types";
import { getPurchaseStatus } from "../utils/purchase";

interface ShopState {
  stars: number;
  inventory: Record<string, number>;
  /** Returns true when the purchase went through. */
  purchase: (item: ShopItem) => boolean;
}

// Replace with the real wallet source (API or game store)
const INITIAL_STARS = 348;

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      stars: INITIAL_STARS,
      inventory: {},
      purchase: (item) => {
        const { stars, inventory } = get();
        const owned = inventory[item.id] ?? 0;

        if (getPurchaseStatus(item, stars, owned) !== "available") return false;

        set({
          stars: stars - item.price,
          inventory: { ...inventory, [item.id]: owned + 1 },
        });
        return true;
      },
    }),
    { name: "shop-store" },
  ),
);
