import type { SegmentedOption } from "@/components/SegmentedControl";
import type { useSettingsStore } from "../store";

type NavBarStyle = ReturnType<typeof useSettingsStore.getState>["navBarStyle"];

export const NAV_BAR_OPTIONS: SegmentedOption<NavBarStyle>[] = [
  { value: "standard", label: "Estándar" },
  { value: "floating", label: "Flotante" },
];
