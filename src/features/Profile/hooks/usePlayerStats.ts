import type { PlayerStats } from "../types";

const MOCK_STATS: PlayerStats = {
  level: 12,
  xp: 1240,
  xpToNextLevel: 2000,
  stars: 348,
  gamesPlayed: 128,
  wins: 79,
  currentStreak: 5,
  bestStreak: 11,
  bestScore: 24580,
  playTimeMinutes: 750,
  unlockedAchievementIds: [
    "first-win",
    "streak-5",
    "stars-100",
    "level-10",
    "games-100",
  ],
};

// Replace with the real source (API or game store)
export function usePlayerStats(): PlayerStats {
  return MOCK_STATS;
}
