import { useLocation, useNavigate } from "react-router";
import { startTabTransition } from "../components/TabTransition";
import { TABS, type Tab, type TabId } from "../components/Tabs";
import { useSettingsStore } from "@/features/Settings/store";

function findTabIndex(pathname: string): number {
  return TABS.findIndex(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

interface TabNavigation {
  activeTab: Tab | undefined;
  selectTab: (id: TabId) => void;
}

export function useTabNavigation(): TabNavigation {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeIndex = findTabIndex(pathname);

  const isPageTransitionEnabled = useSettingsStore(
    (state) => state.isPageTransitionEnabled,
  );

  const selectTab = (id: TabId) => {
    const targetIndex = TABS.findIndex((tab) => tab.id === id);
    const target = TABS[targetIndex];
    if (!target || pathname === target.path) return;

    // Slide only between two different tabs. Re-selecting the active tab
    // (e.g. from a nested route) or leaving a non-tab route just navigates.
    const shouldAnimate =
      isPageTransitionEnabled &&
      activeIndex !== -1 &&
      activeIndex !== targetIndex &&
      startTabTransition(targetIndex > activeIndex ? "forward" : "backward");

    navigate(target.path, { viewTransition: shouldAnimate });
  };

  return { activeTab: TABS[activeIndex], selectTab };
}
