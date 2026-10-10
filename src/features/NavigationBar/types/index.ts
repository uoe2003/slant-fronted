import type { ComponentProps, ReactNode } from "react";

export type NavigationItemBaseProps = ComponentProps<"button"> & {
  active?: boolean;
  icon: ReactNode;
  activeIcon?: ReactNode;
  label: string;
  badge?: string | number;
};
