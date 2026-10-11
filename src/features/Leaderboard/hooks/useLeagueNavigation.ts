import { useState } from "react";
import { useHaptic } from "@/hooks/useHaptic";
import { DEFAULT_LEAGUE, LEAGUE_ORDER, LEAGUES } from "../consts/leagues";

export function useLeagueNavigation() {
  const haptic = useHaptic();
  const [index, setIndex] = useState(() =>
    LEAGUE_ORDER.indexOf(DEFAULT_LEAGUE),
  );

  const move = (direction: -1 | 1) => {
    const next = index + direction;
    if (next < 0 || next >= LEAGUE_ORDER.length) return;
    haptic.trigger("medium");
    setIndex(next);
  };

  return {
    league: LEAGUES[LEAGUE_ORDER[index]],
    canPrev: index > 0,
    canNext: index < LEAGUE_ORDER.length - 1,
    prev: () => move(-1),
    next: () => move(1),
  };
}
