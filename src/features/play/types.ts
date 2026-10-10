import type { LucideIcon } from "lucide-react";

export type GameModeId = "offline" | "online" | "ranked" | "challenges";

export type ModeAccent = "emerald" | "violet" | "rose";

export interface GameMode {
  id: GameModeId;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  /** Unavailable modes are shown as "coming soon" and cannot be opened. */
  available: boolean;
}

export interface OnlineGameMode extends GameMode {
  accent: ModeAccent;
}

export interface OfflineProgress {
  currentLevel: number;
  levelsCompleted: number;
  totalLevels: number;
  starsEarned: number;
  totalStars: number;
}
