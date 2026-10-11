import type { ComponentProps } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

// Constants

const DESKTOP_QUERY = "(min-width: 768px)";

const contentStyles = [
  "border-theme-200/60 bg-theme-50/85 shadow-2xl backdrop-blur-sm",
  "dark:border-theme-800/60 dark:bg-theme-950/85",
  "[--drawer-bleed-background:var(--color-theme-50)]",
  "dark:[--drawer-bleed-background:var(--color-theme-950)]",
  "data-[swipe-direction=down]:rounded-t-3xl",
  "data-[swipe-direction=down]:border-t",
  "data-[swipe-direction=down]:pb-[env(safe-area-inset-bottom,0px)]",
  "data-[swipe-direction=right]:rounded-l-3xl",
  "data-[swipe-direction=right]:border-l",
];

// Root

type AppDrawerProps = Omit<ComponentProps<typeof Drawer>, "swipeDirection">;

function AppDrawer(props: AppDrawerProps) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return (
    <Drawer
      swipeDirection={isDesktop ? "right" : "down"}
      showSwipeHandle={!isDesktop}
      {...props}
    />
  );
}

// Content

interface AppDrawerContentProps extends ComponentProps<typeof DrawerContent> {
  showClose?: boolean;
  closeLabel?: string;
}

function AppDrawerContent({
  className,
  children,
  showClose = true,
  closeLabel = "Close",
  ...props
}: AppDrawerContentProps) {
  return (
    <DrawerContent className={cn(contentStyles, className)} {...props}>
      <div className="relative flex min-h-0 flex-1 flex-col">
        {showClose && (
          <DrawerClose
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label={closeLabel}
                className="absolute top-3 right-4 z-10 size-8 rounded-full bg-foreground/10 hover:bg-foreground/15"
              />
            }
          >
            <X aria-hidden="true" className="size-4" />
          </DrawerClose>
        )}
        {children}
      </div>
    </DrawerContent>
  );
}

// Layout

function AppDrawerBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4 pt-6",
        className,
      )}
      {...props}
    />
  );
}

export { AppDrawer, AppDrawerBody, AppDrawerContent };
