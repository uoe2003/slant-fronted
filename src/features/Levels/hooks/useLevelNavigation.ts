import { useNavigate } from "react-router";
import { useHaptic } from "@/hooks/useHaptic";

export function useLevelNavigation() {
  const haptic = useHaptic();
  const navigate = useNavigate();

  const playLevel = (levelId: string) => {
    haptic.trigger("light");
    navigate(`/game/${levelId}`);
  };

  return { playLevel };
}
