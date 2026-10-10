import {
  Crown,
  Flame,
  Gamepad2,
  Gem,
  Medal,
  Star,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";

interface AchievementDefinition {
  id: string;
  title: string;
  icon: LucideIcon;
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  { id: "first-win", title: "Primera victoria", icon: Trophy },
  { id: "streak-5", title: "Racha de 5", icon: Flame },
  { id: "stars-100", title: "100 estrellas", icon: Star },
  { id: "level-10", title: "Nivel 10", icon: Medal },
  { id: "games-100", title: "100 partidas", icon: Gamepad2 },
  { id: "perfect-game", title: "Partida perfecta", icon: Target },
  { id: "top-10", title: "Top 10", icon: Crown },
  { id: "collector", title: "Coleccionista", icon: Gem },
];
