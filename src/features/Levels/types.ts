import type { Level } from "@/stores/useGameLevelStore";

export interface LevelTheme {
  label: string;
  desc: string;
  color: string;
  border: string;
  glow: string;
  bg: string;
  gradient: string;
}

// View model: one category with everything its section needs to render
export interface LevelCategoryProgress {
  category: string;
  theme: LevelTheme;
  levels: Level[];
  stars: number;
  maxStars: number;
  isLocked: boolean;
}
