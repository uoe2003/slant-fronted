import type { ReactNode } from "react";
import { AppButton } from "@/components/AppButton";
import {
  AppDrawer,
  AppDrawerBody,
  AppDrawerContent,
} from "@/components/AppDrawer";
import { GlassCard } from "@/components/GlassCard";
import { IconTile } from "@/components/IconTile";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import { formatNumber } from "@/utils/format";
import type { ShopItem } from "../types";
import { getPurchaseStatus } from "../utils/purchase";
import { StarPrice } from "./StarPrice";

interface PurchaseDrawerProps {
  item: ShopItem | null;
  open: boolean;
  stars: number;
  ownedCount: number;
  onOpenChange: (open: boolean) => void;
  onConfirm: (item: ShopItem) => void;
}

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <dt className="text-sm text-theme-500">{label}</dt>
      <dd className="text-[15px] font-semibold text-theme-50">{value}</dd>
    </div>
  );
}

export function PurchaseDrawer({
  item,
  open,
  stars,
  ownedCount,
  onOpenChange,
  onConfirm,
}: PurchaseDrawerProps) {
  if (!item) return null;

  const status = getPurchaseStatus(item, stars, ownedCount);
  const missingStars = Math.max(item.price - stars, 0);

  return (
    <AppDrawer open={open} onOpenChange={onOpenChange}>
      <AppDrawerContent closeLabel="Cerrar">
        <AppDrawerBody className="items-center pt-6 text-center">
          <IconTile icon={item.icon} size="lg" />
          <div className="space-y-1">
            <DrawerTitle className="text-xl font-bold text-theme-50">
              {item.name}
            </DrawerTitle>
            <DrawerDescription className="text-theme-500">
              {item.description}
            </DrawerDescription>
          </div>

          <GlassCard className="w-full rounded-2xl">
            <dl className="divide-y divide-theme-50/10">
              <SummaryRow
                label="Precio"
                value={<StarPrice amount={item.price} />}
              />
              <SummaryRow
                label="Tus estrellas"
                value={<StarPrice amount={stars} />}
              />
            </dl>
          </GlassCard>

          {status === "insufficient" && (
            <p role="status" className="text-sm text-amber-300">
              Te faltan {formatNumber(missingStars)} estrellas para conseguirlo.
            </p>
          )}
        </AppDrawerBody>

        <DrawerFooter className="grid grid-cols-2 gap-3">
          <DrawerClose
            render={<AppButton type="button" variant="secondary" size="lg" />}
          >
            Cancelar
          </DrawerClose>
          <AppButton
            size="lg"
            disabled={status !== "available"}
            onClick={() => onConfirm(item)}
          >
            Comprar
          </AppButton>
        </DrawerFooter>
      </AppDrawerContent>
    </AppDrawer>
  );
}
