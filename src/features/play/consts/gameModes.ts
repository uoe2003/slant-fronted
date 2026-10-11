import { Gamepad2, Swords, Trophy, Zap } from "lucide-react";
import type { GameMode, OnlineGameMode } from "../types";

export const OFFLINE_MODE: GameMode = {
  id: "offline",
  title: "Modo offline",
  description: "Supera niveles a tu ritmo, sin conexión.",
  icon: Gamepad2,
  path: "/levels",
  available: true,
};

// To release a mode, set `available` to true
export const ONLINE_MODES: OnlineGameMode[] = [
  {
    id: "ranked",
    title: "Ranking",
    description: "Sube de rango y compite por la cima.",
    icon: Trophy,
    path: "/play/ranked",
    available: false,
    accent: "violet",
  },
  {
    id: "online",
    title: "Partida online",
    description: "Partidas rápidas contra otros jugadores, sin riesgo.",
    icon: Zap,
    path: "/play/online",
    available: false,
    accent: "emerald",
  },
  {
    id: "challenges",
    title: "Retos",
    description: "Rétate con otros jugadores y apuesta estrellas.",
    icon: Swords,
    path: "/play/challenges",
    available: false,
    accent: "rose",
  },
];
