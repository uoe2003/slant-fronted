import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultSettings } from "./defaults";
import type { SettingsStore } from "./types";

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setSetting: (key, value) => set((state) => ({ ...state, [key]: value })),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: "settings",
      // Bump and add `migrate` when a setting is renamed or removed.
      version: 1,
    },
  ),
);
