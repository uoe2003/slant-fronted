import { useLayoutEffect, useRef } from "react";

/**
 * Keeps an absolutely positioned indicator aligned with the element inside the
 * container that has aria-current="page". The container must be positioned.
 *
 * Geometry is written straight to the DOM (no state, no re-renders). Two data
 * attributes drive the styling:
 *  - data-visible: an active element exists
 *  - data-ready: the indicator has been placed, so moves may animate
 */
export function useActiveIndicator(activeSelector: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    let frame = 0;

    const sync = () => {
      const active = container.querySelector<HTMLElement>(activeSelector);

      if (!active) {
        delete indicator.dataset.visible;
        return;
      }

      // Re-appearing after a gap must jump to the item instead of sliding.
      if (!("visible" in indicator.dataset)) {
        delete indicator.dataset.ready;
      }

      Object.assign(indicator.style, {
        top: `${active.offsetTop}px`,
        width: `${active.offsetWidth}px`,
        height: `${active.offsetHeight}px`,
        transform: `translateX(${active.offsetLeft}px)`,
      });
      indicator.dataset.visible = "";

      // Commit this position now: rAF callbacks run before the frame's style
      // recalc, so enabling transitions without a flush would animate from 0.
      void indicator.offsetWidth;

      if (!("ready" in indicator.dataset)) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          indicator.dataset.ready = "";
        });
      }
    };

    sync();

    const mutationObserver = new MutationObserver(sync);
    mutationObserver.observe(container, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["aria-current"],
    });

    // Item widths can change with fonts, labels or the viewport.
    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [activeSelector]);

  return { containerRef, indicatorRef };
}
