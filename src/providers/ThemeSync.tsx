import { useEffect } from "react";
import { useSettingsStore } from "@/features/Settings/store";

export function ThemeSync() {
  const themeColor = useSettingsStore((state) => state.themeColor);
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-palette", themeColor);
  }, [themeColor]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
}
