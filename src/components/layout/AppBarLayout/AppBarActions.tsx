import { useContext } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AppBarSlotContext } from "./AppBarSlotContext";

/** Renders its children in the AppBar actions area from any page inside AppBarLayout. */
export function AppBarActions({ children }: { children: ReactNode }) {
  const slot = useContext(AppBarSlotContext);
  return slot ? createPortal(children, slot) : null;
}
