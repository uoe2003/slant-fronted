import { useCallback, useMemo } from "react";
import { useSettingsStore } from "@/features/Settings/store";

export type HapticType =
  | "light"
  | "medium"
  | "heavy"
  | "success"
  | "warning"
  | "error";

const PATTERNS: Record<HapticType, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 40,
  success: [10, 40, 10],
  warning: [20, 50, 20],
  error: [30, 50, 30, 50, 30],
};

const canVibrate = typeof navigator !== "undefined" && "vibrate" in navigator;

export function useHaptic() {
  const vibrationEnabled = useSettingsStore((s) => s.vibrationEnabled);

  const trigger = useCallback(
    (type: HapticType = "light") => {
      if (!vibrationEnabled || !canVibrate) return;
      navigator.vibrate(PATTERNS[type]);
    },
    [vibrationEnabled],
  );

  return useMemo(() => ({ trigger }), [trigger]);
}
