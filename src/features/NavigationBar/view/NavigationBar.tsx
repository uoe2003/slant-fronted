import {
  FixedNavigationBar,
  FixedNavigationItem,
} from "../components/FixedNavigationBar";
import {
  FloatingNavigationBar,
  FloatingNavigationItem,
} from "../components/FloatingNavigationBar";
import { useTabNavigation } from "../hooks/useTabNavigation";
import { TABS } from "../components/Tabs";
import { useSettingsStore } from "@/features/Settings/store";

const FLOATING_ACTIVE_COLOR = "#007AFF";

export function NavigationBar() {
  const { activeTab, selectTab } = useTabNavigation();

  const navStyle = useSettingsStore((s) => s.navBarStyle);

  return (
    <>
      {navStyle === "standard" ? (
        <FixedNavigationBar>
          {TABS.map(({ id, label, icon: Icon }) => (
            <FixedNavigationItem
              key={id}
              label={label}
              icon={<Icon />}
              activeIcon={<Icon className="fill-current" />}
              active={id === activeTab?.id}
              onClick={() => selectTab(id)}
            />
          ))}
        </FixedNavigationBar>
      ) : (
        <FloatingNavigationBar activeColor={FLOATING_ACTIVE_COLOR}>
          {TABS.map(({ id, label, icon: Icon }) => (
            <FloatingNavigationItem
              key={id}
              label={label}
              icon={<Icon />}
              activeIcon={<Icon className="fill-current" />}
              active={id === activeTab?.id}
              onClick={() => selectTab(id)}
            />
          ))}
        </FloatingNavigationBar>
      )}
    </>
  );
}
