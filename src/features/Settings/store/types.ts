import type { BackgroundVariant } from "@/components/Background";
import type { NavStyle, Theme } from "../types";

export type Settings = {
  navBarStyle: NavStyle;
  theme: Theme;
  themeColor: string;
  isPageTransitionEnabled: boolean;
  mainBackground: BackgroundVariant;
  secondaryBackground: BackgroundVariant;
  musicVolume: number;
  soundEffectsVolume: number;
  vibrationEnabled: boolean;
  notificationsEnabled: boolean;
};

export type SettingsActions = {
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
};

export type SettingsStore = Settings & SettingsActions;
