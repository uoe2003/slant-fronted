export function getWinRate(wins: number, gamesPlayed: number): number {
  return gamesPlayed > 0 ? Math.round((wins / gamesPlayed) * 100) : 0;
}

/** Returns a value from 0 to 1. */
export function getLevelProgress(xp: number, xpToNextLevel: number): number {
  if (xpToNextLevel <= 0) return 0;
  return Math.min(Math.max(xp / xpToNextLevel, 0), 1);
}
