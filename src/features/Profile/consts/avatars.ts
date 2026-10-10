import {
  Crown,
  Flame,
  Gem,
  Ghost,
  Rocket,
  Swords,
  type LucideIcon,
} from "lucide-react";
import type { AvatarId } from "../types";

interface AvatarOption {
  id: AvatarId;
  label: string;
  icon: LucideIcon;
}

export const AVATARS: AvatarOption[] = [
  { id: "rocket", label: "Cohete", icon: Rocket },
  { id: "crown", label: "Corona", icon: Crown },
  { id: "flame", label: "Llama", icon: Flame },
  { id: "ghost", label: "Fantasma", icon: Ghost },
  { id: "gem", label: "Gema", icon: Gem },
  { id: "swords", label: "Espadas", icon: Swords },
];

export function getAvatar(id: AvatarId): AvatarOption {
  return AVATARS.find((avatar) => avatar.id === id) ?? AVATARS[0];
}
