export type LevelStatus = "locked" | "current" | "completed";

export type LevelCategory = "Novato" | "Aprendiz" | "Maestro" | "Leyenda";

export interface LevelStats {
  stars: number;
}

export interface Level {
  id: string;
  levelCategory: LevelCategory;
  status: LevelStatus;
  stats?: LevelStats;
}

export interface GameLevelState {
  // Display order of the categories
  categories: LevelCategory[];
  // Flat list ordered by progression: category by category, level by level
  levels: Level[];
  // Marks a level as completed (keeping the best stars) and unlocks the next one
  completeLevel: (levelId: string, stars: number) => void;
}
