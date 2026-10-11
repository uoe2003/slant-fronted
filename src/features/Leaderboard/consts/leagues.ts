import { Flame, Gem, Shield, Trophy } from "lucide-react";
import type { LeagueConfig, LeagueId } from "../types";

export const LEAGUE_ORDER: readonly LeagueId[] = [
  "bronze",
  "silver",
  "gold",
  "platinum",
  "diamond",
  "master",
];

export const DEFAULT_LEAGUE: LeagueId = "gold";

export const LEAGUES: Record<LeagueId, LeagueConfig> = {
  bronze: {
    id: "bronze",
    label: "Bronce",
    icon: Shield,
    color: "text-orange-600 dark:text-orange-500",
    border: "border-orange-600/50",
    shadow: "shadow-orange-500/20",
    podiumGlass:
      "bg-linear-to-b from-orange-500/20 to-orange-900/5 border-orange-500/20",
    iconColor: "text-orange-500/20",
  },
  silver: {
    id: "silver",
    label: "Plata",
    icon: Shield,
    color: "text-slate-500 dark:text-slate-400",
    border: "border-slate-500/50",
    shadow: "shadow-slate-500/20",
    podiumGlass:
      "bg-linear-to-b from-slate-500/20 to-slate-900/5 border-slate-500/20",
    iconColor: "text-slate-500/20",
  },
  gold: {
    id: "gold",
    label: "Oro",
    icon: Trophy,
    color: "text-yellow-500 dark:text-yellow-400",
    border: "border-yellow-500/50",
    shadow: "shadow-yellow-500/40",
    podiumGlass:
      "bg-linear-to-b from-yellow-500/20 to-yellow-900/5 border-yellow-500/20",
    iconColor: "text-yellow-500/20",
  },
  platinum: {
    id: "platinum",
    label: "Platino",
    icon: Gem,
    color: "text-cyan-500 dark:text-cyan-400",
    border: "border-cyan-500/50",
    shadow: "shadow-cyan-500/40",
    podiumGlass:
      "bg-linear-to-b from-cyan-500/20 to-cyan-900/5 border-cyan-500/20",
    iconColor: "text-cyan-500/20",
  },
  diamond: {
    id: "diamond",
    label: "Diamante",
    icon: Gem,
    color: "text-purple-500 dark:text-purple-400",
    border: "border-purple-500/50",
    shadow: "shadow-purple-500/40",
    podiumGlass:
      "bg-linear-to-b from-purple-500/20 to-purple-900/5 border-purple-500/20",
    iconColor: "text-purple-500/20",
  },
  master: {
    id: "master",
    label: "Maestro",
    icon: Flame,
    color: "text-red-500 dark:text-red-500",
    border: "border-red-500/50",
    shadow: "shadow-red-500/50",
    podiumGlass:
      "bg-linear-to-b from-red-500/20 to-red-900/5 border-red-500/20",
    iconColor: "text-red-500/20",
  },
};
