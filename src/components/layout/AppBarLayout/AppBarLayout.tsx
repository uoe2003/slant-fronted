import { AppBar } from "@/components/AppBar";
import { Background } from "@/components/Background";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSettingsStore } from "@/features/Settings/store";
import { useRouteHandle } from "@/routers/routeHandle";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AppBarSlotContext } from "./AppBarSlotContext";

export function AppBarLayout() {
  const navigate = useNavigate();
  const { title = "", hideBack } = useRouteHandle();
  const [actionsSlot, setActionsSlot] = useState<HTMLElement | null>(null);

  const secondaryBackground = useSettingsStore((s) => s.secondaryBackground);

  const handleBack = () => {
    const canGoBack = (window.history.state?.idx ?? 0) > 0;
    if (canGoBack) navigate(-1);
    else navigate("/", { replace: true });
  };

  return (
    <>
      <Background variant={secondaryBackground} />
      <AppBarSlotContext.Provider value={actionsSlot}>
        <div className="relative isolate flex h-dvh flex-col text-slate-100">
          <AppBar
            title={title}
            hideBack={hideBack}
            onBack={handleBack}
            actions={<div ref={setActionsSlot} className="flex items-center" />}
          />

          {/* El main ya no hace scroll por sí mismo, cede el control al ScrollArea */}
          <main className="flex-1 overflow-hidden pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]">
            <ScrollArea className="h-full w-full">
              <div className="mx-auto w-full max-w-180 px-6 pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <Outlet />
              </div>
            </ScrollArea>
          </main>
        </div>
      </AppBarSlotContext.Provider>
    </>
  );
}
