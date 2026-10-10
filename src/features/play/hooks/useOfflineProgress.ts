import type { OfflineProgress } from "../types";

const MOCK_PROGRESS: OfflineProgress = {
  currentLevel: 13,
  levelsCompleted: 12,
  totalLevels: 20,
  starsEarned: 45,
  totalStars: 60,
};

// Replace with the real source when levels exist
export function useOfflineProgress(): OfflineProgress {
  return MOCK_PROGRESS;
}
