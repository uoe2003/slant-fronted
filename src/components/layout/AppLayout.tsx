import { cn } from "cn";
import { Outlet } from "react-router";
import { NavigationBar } from "../../features/NavigationBar";
import { Background } from "../Background";
import { useSettingsStore } from "@/features/Settings/store";

export function AppLayout() {
  const mainBackground = useSettingsStore((s) => s.mainBackground);

  return (
    <>
      <Background variant={mainBackground} />
      <div className="relative flex h-full w-full flex-col overflow-hidden text-foreground lg:flex-row">
        <main
          data-slot="app-content"
          className={cn(
            // sin bg-background: deja ver el fondo
            "flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6",
            "pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:pb-[calc(7rem+env(safe-area-inset-bottom,0px))]",
          )}
        >
          <div className="mx-auto w-full max-w-4xl">
            <Outlet />
          </div>
        </main>

        <NavigationBar />
      </div>
    </>
  );
}
