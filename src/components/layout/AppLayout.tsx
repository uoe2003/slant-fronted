import { cn } from "cn";
import { Outlet } from "react-router";
import { NavigationBar } from "../../features/NavigationBar";
import { Background } from "../Background";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSettingsStore } from "@/features/Settings/store";

export function AppLayout() {
  const mainBackground = useSettingsStore((s) => s.mainBackground);

  return (
    <>
      <Background variant={mainBackground} />
      <div className="relative flex h-full w-full flex-col overflow-hidden text-foreground lg:flex-row">
        <main
          data-slot="app-content"
          className="flex min-h-0 min-w-0 flex-1 flex-col"
        >
          <ScrollArea className="min-h-0 flex-1 [&>[data-radix-scroll-area-viewport]>div]:block!">
            <div
              className={cn(
                "p-8",
                "pb-[calc(7rem+env(safe-area-inset-bottom,0px))]",
              )}
            >
              <div className="mx-auto w-full max-w-4xl">
                <Outlet />
              </div>
            </div>
          </ScrollArea>
        </main>

        <NavigationBar />
      </div>
    </>
  );
}
