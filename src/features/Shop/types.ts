import type { LucideIcon } from "lucide-react";

export type ShopCategoryId = "boost" | "upgrade";

export type ShopFilterId = ShopCategoryId | "all";

export type PurchaseStatus = "available" | "insufficient" | "owned";

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  /** Price in stars. */
  price: number;
  category: ShopCategoryId;
  /** Stackable items can be bought several times. */
  stackable: boolean;
  icon: LucideIcon;
}
