import { create } from "zustand";
import { persist } from "zustand/middleware";

export const TRANSITION_STYLES = ["pan", "browser", "none"] as const;
export type TransitionStyle = (typeof TRANSITION_STYLES)[number];

type TransitionStyleState = {
  style: TransitionStyle;
  setStyle: (style: TransitionStyle) => void;
};

export const useTransitionStyleStore = create<TransitionStyleState>()(
  persist(
    (set) => ({
      style: "pan",
      setStyle: (style) => set({ style }),
    }),
    {
      name: "transition-style-store",
      partialize: ({ style }) => ({ style }),
      // Ignore stored values that are no longer a valid style.
      merge: (persisted, current) => {
        const stored = (persisted as Partial<TransitionStyleState> | undefined)
          ?.style;
        return {
          ...current,
          style:
            TRANSITION_STYLES.find((style) => style === stored) ??
            current.style,
        };
      },
    },
  ),
);

/** For code outside React, such as tab-transition.ts. */
export const getTransitionStyle = () =>
  useTransitionStyleStore.getState().style;

function syncAttribute(style: TransitionStyle) {
  document.documentElement.dataset.transitionStyle = style;
}

syncAttribute(getTransitionStyle());
useTransitionStyleStore.subscribe((state) => syncAttribute(state.style));
