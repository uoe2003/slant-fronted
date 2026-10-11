import type { ComponentProps } from "react";
import { X } from "lucide-react";
import { AppButton } from "@/components/AppButton";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

// Constants

const DESKTOP_QUERY = "(min-width: 768px)";

const contentStyles = [
  "border-theme-50/10 bg-theme-950/85 text-theme-100 shadow-2xl backdrop-blur-sm",
  "[--drawer-bleed-background:var(--color-theme-950)]",
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
              <AppButton
                variant="ghost"
                size="icon-sm"
                aria-label={closeLabel}
                className="absolute top-3 right-4 z-10 bg-theme-50/10 hover:bg-theme-50/15"
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
        "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4",
        className,
      )}
      {...props}
    />
  );
}

export { AppDrawer, AppDrawerBody, AppDrawerContent };
