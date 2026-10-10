import {
  Gamepad2Icon,
  StoreIcon,
  TrophyIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";

export interface Tab {
  id: "game" | "ranking" | "store" | "profile";
  label: string;
  path: string;
  icon: LucideIcon;
}

// The array order defines the visual order and the slide direction between tabs.
export const TABS: readonly Tab[] = [
  { id: "game", label: "Jugar", path: "/game", icon: Gamepad2Icon },
  { id: "ranking", label: "Ranking", path: "/ranking", icon: TrophyIcon },
  { id: "store", label: "Tienda", path: "/store", icon: StoreIcon },
  { id: "profile", label: "Perfil", path: "/profile", icon: UserIcon },
];

export type TabId = Tab["id"];
