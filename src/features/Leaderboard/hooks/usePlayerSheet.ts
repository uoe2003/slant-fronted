import { useState } from "react";
import { useHaptic } from "@/hooks/useHaptic";
import type { Player } from "../types";

export function usePlayerSheet() {
  const haptic = useHaptic();
  const [player, setPlayer] = useState<Player | null>(null);
  const [open, setOpen] = useState(false);

  // Keep the player after closing so the content stays during the exit animation
  const show = (next: Player) => {
    haptic.trigger("light");
    setPlayer(next);
    setOpen(true);
  };

  return { player, open, show, onOpenChange: setOpen };
}
