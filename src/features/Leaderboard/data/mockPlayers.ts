import type { Player } from "../types";

export const CURRENT_USER_ID = "p13";

// Temporary data until the ranking API is connected
export const MOCK_PLAYERS: Player[] = Array.from({ length: 20 }, (_, i) => {
  const gamesPlayed = 220 - i * 7;

  return {
    id: `p${i + 1}`,
    name: i === 0 ? "KingLogic" : i === 1 ? "QueenPuzzle" : `Jugador ${i + 1}`,
    rank: i + 1,
    score: 5000 - i * 150,
    level: 60 - i * 2,
    avatarUrl: `https://i.pravatar.cc/150?u=${i + 50}`,
    rankChange: ((i * 7) % 11) - 4,
    stats: {
      gamesPlayed,
      wins: Math.round(gamesPlayed * (0.8 - i * 0.015)),
      bestStreak: 18 - (i % 9),
      stars: 340 - i * 9,
    },
  };
});
