import { create } from "zustand";
import { MAX_STARS_PER_LEVEL } from "./constants";
import { INITIAL_CATEGORIES, INITIAL_LEVELS } from "./mockLevels";
import type { GameLevelState, Level } from "./type";

export const useGameLevelStore = create<GameLevelState>()((set) => ({
  categories: INITIAL_CATEGORIES,
  levels: INITIAL_LEVELS,

  completeLevel: (levelId, stars) =>
    set((state) => {
      const index = state.levels.findIndex((level) => level.id === levelId);
      // Unknown or still-locked levels can't be completed
      if (index === -1 || state.levels[index].status === "locked") return state;

      const earned = Math.min(
        Math.max(Math.round(stars), 0),
        MAX_STARS_PER_LEVEL,
      );

      const levels = state.levels.map((level, i): Level => {
        if (i === index) {
          return {
            ...level,
            status: "completed",
            stats: { stars: Math.max(level.stats?.stars ?? 0, earned) },
          };
        }
        // Unlock the next level in progression order (may be in the next category)
        if (i === index + 1 && level.status === "locked") {
          return { ...level, status: "current" };
        }
        return level;
      });

      return { levels };
    }),
}));
