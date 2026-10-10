export type TabTransitionDirection = "forward" | "backward";

// Must match the keyframe names in styles/transitions.css.
const KEYFRAME_PREFIX = "tab-slide";
// Keeps the attributes alive until the browser has torn down the transition.
const CLEANUP_DELAY_MS = 100;

let cancelPending: (() => void) | null = null;

function canAnimate(): boolean {
  return (
    "startViewTransition" in document &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Scopes the CSS in transitions.css to a tab switch and removes that scope
 * once the animation has finished. Call it right before navigating.
 *
 * Returns false when the transition should be skipped (unsupported browser
 * or reduced motion); the caller then navigates without a view transition.
 */
export function startTabTransition(direction: TabTransitionDirection): boolean {
  if (!canAnimate()) return false;

  cancelPending?.();

  const root = document.documentElement;
  root.dataset.transitionScope = "tab";
  root.dataset.transitionDirection = direction;

  let timeoutId: number | undefined;

  const clear = () => {
    root.removeEventListener("animationend", handleAnimationEnd);
    window.clearTimeout(timeoutId);
    delete root.dataset.transitionScope;
    delete root.dataset.transitionDirection;
    cancelPending = null;
  };

  // Pseudo-element animations fire on <html>; ignore the browser's own
  // group animations, which can end before ours.
  const handleAnimationEnd = (event: AnimationEvent) => {
    if (!event.animationName.startsWith(KEYFRAME_PREFIX)) return;
    root.removeEventListener("animationend", handleAnimationEnd);
    timeoutId = window.setTimeout(clear, CLEANUP_DELAY_MS);
  };

  root.addEventListener("animationend", handleAnimationEnd);
  cancelPending = clear;

  return true;
}
