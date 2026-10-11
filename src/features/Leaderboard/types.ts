import type { LucideIcon } from "lucide-react";

export type LeagueId =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "master";

export interface LeagueConfig {
  id: LeagueId;
  label: string;
  icon: LucideIcon;
  color: string;
  border: string;
  shadow: string;
  podiumGlass: string;
  iconColor: string;
}

export interface PlayerStats {
  gamesPlayed: number;
  wins: number;
  bestStreak: number;
  stars: number;
}

export interface Player {
  id: string;
  name: string;
  rank: number;
  score: number;
  level: number;
  avatarUrl?: string;
  // Positions gained (positive) or lost (negative) since last week
  rankChange: number;
  stats: PlayerStats;
}
