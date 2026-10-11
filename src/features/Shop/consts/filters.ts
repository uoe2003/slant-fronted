import type { ShopFilterId } from "../types";

interface ShopFilter {
  id: ShopFilterId;
  label: string;
}

export const SHOP_FILTERS: ShopFilter[] = [
  { id: "all", label: "Todo" },
  { id: "boost", label: "Potenciadores" },
  { id: "upgrade", label: "Mejoras" },
];
