import { AppBarActions } from "@/components/layout/AppBarLayout";
import { SegmentedControl } from "@/components/SegmentedControl";
import { Slider } from "@/components/Slider";
import { Switch } from "@/components/Switch";
import { SettingsRow, SettingsSection } from "../components/SettingsLayout";
import { useSettingsStore } from "../store";
import { ColorSelector } from "../components/ColorSelector";
import { NAV_BAR_OPTIONS } from "../consts/NavBarOptions";
import { BACKGROUND_OPTIONS } from "../consts/BackgroundOptions";
import { THEME_COLORS_OPTIONS } from "../consts/ThemeColors";
import { Select } from "@/components/Select";

export function SettingsView() {
  const musicVolume = useSettingsStore((s) => s.musicVolume);
  const soundEffectsVolume = useSettingsStore((s) => s.soundEffectsVolume);
  const vibrationEnabled = useSettingsStore((s) => s.vibrationEnabled);
  const notificationsEnabled = useSettingsStore((s) => s.notificationsEnabled);
  const isPageTransitionEnabled = useSettingsStore(
    (s) => s.isPageTransitionEnabled,
  );
  const mainBackground = useSettingsStore((s) => s.mainBackground);
  const secondaryBackground = useSettingsStore((s) => s.secondaryBackground);
  const navBarStyle = useSettingsStore((s) => s.navBarStyle);
  const themeColor = useSettingsStore((s) => s.themeColor);
  const theme = useSettingsStore((s) => s.theme);

  const setSetting = useSettingsStore((s) => s.setSetting);
  const resetSettings = useSettingsStore((s) => s.resetSettings);

  return (
    <>
      <AppBarActions>
        <button
          type="button"
          onClick={resetSettings}
          className="h-10 rounded-full px-4 text-sm font-medium text-cyan-300 hover:bg-white/10 active:bg-white/15"
        >
          Restablecer
        </button>
      </AppBarActions>

      <div className="space-y-6">
        <SettingsSection title="Audio">
          <SettingsRow stacked label="Música" value={`${musicVolume}%`}>
            <Slider
              aria-label="Volumen de la música"
              value={musicVolume}
              onValueChange={(value) => setSetting("musicVolume", value)}
              max={100}
              step={1}
            />
          </SettingsRow>
          <SettingsRow
            stacked
            label="Efectos de sonido"
            value={`${soundEffectsVolume}%`}
          >
            <Slider
              aria-label="Volumen de los efectos de sonido"
              value={soundEffectsVolume}
              onValueChange={(value) => setSetting("soundEffectsVolume", value)}
              max={100}
              step={1}
            />
          </SettingsRow>
          <SettingsRow
            label="Vibración"
            description="Respuesta háptica durante el juego"
          >
            <Switch
              label="Vibración"
              checked={vibrationEnabled}
              onChange={(value) => setSetting("vibrationEnabled", value)}
            />
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="Apariencia">
          <SettingsRow
            label="Barra de navegación"
            description="Estilo de la barra de navegación"
          >
            <SegmentedControl
              label="Estilo de la barra de navegación"
              options={NAV_BAR_OPTIONS}
              value={navBarStyle}
              onChange={(value) => setSetting("navBarStyle", value)}
            />
          </SettingsRow>
          <SettingsRow
            label="Transiciones de página"
            description="Animaciones al cambiar de página"
          >
            <Switch
              label="Transiciones de página"
              checked={isPageTransitionEnabled}
              onChange={(value) => setSetting("isPageTransitionEnabled", value)}
            />
          </SettingsRow>
          <SettingsRow
            label="Fondo principal"
            description="Fondo principal de la aplicación"
          >
            <Select
              aria-label="Fondo principal"
              items={BACKGROUND_OPTIONS}
              value={mainBackground}
              onValueChange={(value) => setSetting("mainBackground", value)}
            />
          </SettingsRow>
          <SettingsRow
            label="Fondo secundario"
            description="Fondo secundario de la aplicación"
          >
            <Select
              aria-label="Fondo secundario"
              items={BACKGROUND_OPTIONS}
              value={secondaryBackground}
              onValueChange={(value) =>
                setSetting("secondaryBackground", value)
              }
            />
          </SettingsRow>
          <SettingsRow stacked label="Color principal" value={themeColor}>
            <ColorSelector
              label="Color principal"
              options={THEME_COLORS_OPTIONS}
              value={themeColor}
              onChange={(value) => setSetting("themeColor", value)}
            />
          </SettingsRow>
          <SettingsRow
            label="Tema de la aplicación"
            description="Apariencia general de la aplicación"
          >
            <SegmentedControl
              label="Tema de la aplicación"
              options={[
                { value: "light", label: "Claro" },
                { value: "dark", label: "Oscuro" },
              ]}
              value={theme}
              onChange={(value) => setSetting("theme", value)}
            />
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="General">
          <SettingsRow
            label="Notificaciones"
            description="Eventos, recompensas y recordatorios"
          >
            <Switch
              label="Notificaciones"
              checked={notificationsEnabled}
              onChange={(value) => setSetting("notificationsEnabled", value)}
            />
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="General">
          <SettingsRow
            label="Notificaciones"
            description="Eventos, recompensas y recordatorios"
          >
            <Switch
              label="Notificaciones"
              checked={notificationsEnabled}
              onChange={(value) => setSetting("notificationsEnabled", value)}
            />
          </SettingsRow>
        </SettingsSection>
      </div>
    </>
  );
}
