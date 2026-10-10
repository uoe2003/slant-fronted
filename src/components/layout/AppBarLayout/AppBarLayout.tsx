import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AppBar } from "@/components/AppBar";
import { useRouteHandle } from "@/routers/routeHandle";
import { AppBarSlotContext } from "./AppBarSlotContext";
import { Background } from "@/components/Background";
import { useSettingsStore } from "@/features/Settings/store";
import { THEME_COLORS } from "@/features/Settings/consts/ThemeColors";

export function AppBarLayout() {
  const navigate = useNavigate();
  const { title = "", hideBack } = useRouteHandle();
  const [actionsSlot, setActionsSlot] = useState<HTMLElement | null>(null);

  const secondaryBackground = useSettingsStore((s) => s.secondaryBackground);
  const themeColor = useSettingsStore((s) => s.themeColor);
  const theme = useSettingsStore((s) => s.theme);

  const handleBack = () => {
    // React Router stores the history position in `idx`; 0 means there is nowhere to go back to
    const canGoBack = (window.history.state?.idx ?? 0) > 0;
    if (canGoBack) navigate(-1);
    else navigate("/", { replace: true });
  };

  return (
    <>
      <Background
        variant={secondaryBackground}
        color={THEME_COLORS[themeColor].value}
        mode={theme === "system" ? undefined : theme}
      />
      <AppBarSlotContext.Provider value={actionsSlot}>
        <div className="relative isolate flex h-dvh flex-col text-slate-100">
          <AppBar
            title={title}
            hideBack={hideBack}
            onBack={handleBack}
            actions={<div ref={setActionsSlot} className="flex items-center" />}
          />

          <main className="flex-1 overflow-y-auto overscroll-contain pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]">
            <div className="mx-auto w-full max-w-180 px-6 pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <Outlet />
            </div>
          </main>
        </div>
      </AppBarSlotContext.Provider>
    </>
  );
}
