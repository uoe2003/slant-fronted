import type { PurchaseStatus, ShopItem } from "../types";

export function getPurchaseStatus(
  item: ShopItem,
  stars: number,
  ownedCount: number,
): PurchaseStatus {
  if (!item.stackable && ownedCount > 0) return "owned";
  return stars >= item.price ? "available" : "insufficient";
}
