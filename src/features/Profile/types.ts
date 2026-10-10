export type AvatarId =
  | "rocket"
  | "crown"
  | "flame"
  | "ghost"
  | "gem"
  | "swords";

/** Information the player can edit. */
export interface PlayerProfile {
  displayName: string;
  tagline: string;
  avatarId: AvatarId;
}

/** Progress data produced by the game. */
export interface PlayerStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  stars: number;
  gamesPlayed: number;
  wins: number;
  currentStreak: number;
  bestStreak: number;
  bestScore: number;
  playTimeMinutes: number;
  unlockedAchievementIds: string[];
}
