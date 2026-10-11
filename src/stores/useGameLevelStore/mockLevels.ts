import type { Level, LevelCategory } from "./type";

// Temporary data until the levels API is connected
export const INITIAL_CATEGORIES: LevelCategory[] = [
  "Novato",
  "Aprendiz",
  "Maestro",
  "Leyenda",
];

const LEVEL_PLAN: Record<LevelCategory, { total: number; completed: number }> =
  {
    Novato: { total: 16, completed: 16 },
    Aprendiz: { total: 25, completed: 25 },
    Maestro: { total: 30, completed: 5 },
    Leyenda: { total: 10, completed: 0 },
  };

const levels: Level[] = INITIAL_CATEGORIES.flatMap((category) => {
  const { total, completed } = LEVEL_PLAN[category];

  return Array.from({ length: total }, (_, i): Level => {
    const isCompleted = i < completed;

    return {
      id: `${category.toLowerCase()}-${i + 1}`,
      levelCategory: category,
      status: isCompleted ? "completed" : "locked",
      // Deterministic 1-3 stars so the UI is stable between reloads
      stats: { stars: isCompleted ? 1 + ((i * 7) % 3) : 0 },
    };
  });
});

// The first unfinished level in progression order is the current one
const currentIndex = levels.findIndex((level) => level.status === "locked");

export const INITIAL_LEVELS: Level[] = levels.map(
  (level, i): Level =>
    i === currentIndex ? { ...level, status: "current" } : level,
);
