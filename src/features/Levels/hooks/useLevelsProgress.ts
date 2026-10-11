import { useMemo } from "react";
import { useGameLevelStore } from "@/stores/useGameLevelStore";
import type { Level } from "@/stores/useGameLevelStore/type";
import {
  DEFAULT_LEVEL_THEME,
  LEVEL_THEMES,
  MAX_STARS_PER_LEVEL,
} from "../consts/levels";
import type { LevelCategoryProgress } from "../types";

export function useLevelsProgress() {
  const categories = useGameLevelStore((state) => state.categories);
  const levels = useGameLevelStore((state) => state.levels);

  return useMemo(() => {
    // Group once instead of filtering the whole list per category
    const levelsByCategory = new Map<string, Level[]>();
    for (const level of levels) {
      const group = levelsByCategory.get(level.levelCategory);
      if (group) group.push(level);
      else levelsByCategory.set(level.levelCategory, [level]);
    }

    const progress: LevelCategoryProgress[] = categories.map((category) => {
      const categoryLevels = levelsByCategory.get(category) ?? [];

      return {
        category,
        theme: LEVEL_THEMES[category.toLowerCase()] ?? DEFAULT_LEVEL_THEME,
        levels: categoryLevels,
        stars: categoryLevels.reduce(
          (acc, level) => acc + (level.stats?.stars ?? 0),
          0,
        ),
        maxStars: categoryLevels.length * MAX_STARS_PER_LEVEL,
        // A category is locked until its first level is unlocked
        isLocked: categoryLevels[0]?.status === "locked",
      };
    });

    return {
      categories: progress,
      totalStars: progress.reduce((acc, c) => acc + c.stars, 0),
      maxStars: progress.reduce((acc, c) => acc + c.maxStars, 0),
    };
  }, [categories, levels]);
}
