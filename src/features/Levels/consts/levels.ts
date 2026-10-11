import type { LevelTheme } from "../types";

export { MAX_STARS_PER_LEVEL } from "@/stores/useGameLevelStore/constants";

// Keys are the lowercased category names coming from the store
export const LEVEL_THEMES: Partial<Record<string, LevelTheme>> = {
  novato: {
    label: "Nivel Novato",
    desc: "El comienzo del viaje",
    color: "text-emerald-400",
    border: "border-emerald-500/40",
    glow: "shadow-emerald-500/30",
    bg: "bg-emerald-500/10",
    gradient: "from-emerald-500/20 to-teal-500/5",
  },
  aprendiz: {
    label: "Nivel Aprendiz",
    desc: "Los desafíos aumentan",
    color: "text-cyan-400",
    border: "border-cyan-500/40",
    glow: "shadow-cyan-500/30",
    bg: "bg-cyan-500/10",
    gradient: "from-cyan-500/20 to-blue-500/5",
  },
  maestro: {
    label: "Nivel Maestro",
    desc: "Solo para expertos",
    color: "text-purple-400",
    border: "border-purple-500/40",
    glow: "shadow-purple-500/30",
    bg: "bg-purple-500/10",
    gradient: "from-purple-500/20 to-fuchsia-500/5",
  },
  leyenda: {
    label: "Nivel Leyenda",
    desc: "La prueba final",
    color: "text-amber-400",
    border: "border-amber-500/40",
    glow: "shadow-amber-500/30",
    bg: "bg-amber-500/10",
    gradient: "from-amber-500/20 to-orange-500/5",
  },
};

// Fallback so an unknown category never crashes the view
export const DEFAULT_LEVEL_THEME: LevelTheme = {
  label: "Niveles",
  desc: "Nuevos desafíos",
  color: "text-theme-400",
  border: "border-theme-400/40",
  glow: "shadow-theme-400/30",
  bg: "bg-theme-400/10",
  gradient: "from-theme-400/20 to-theme-400/5",
};
