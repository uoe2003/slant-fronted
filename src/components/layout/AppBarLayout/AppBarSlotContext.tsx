import { createContext } from "react";

/** DOM node inside the AppBar where pages render their actions. */
export const AppBarSlotContext = createContext<HTMLElement | null>(null);
