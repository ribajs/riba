import { Binder } from "@ribajs/core";
import { scrollToPosition } from "@ribajs/utils/src/dom";

/**
 * rv-scroll-position-*
 *
 * Scroll to a position
 *
 * @example
 * ```
 * <div rv-scroll-position-y="'end'"></div>
 * ```
 *
 * ```
 * <div rv-scroll-position-x="'start'"></div>
 * ```
 */
export const scrollPositionAngleBinder: Binder<number | "end" | "start"> = {
  name: "scroll-position-*",
  customData: {},

  routine(
    el: HTMLElement | (Window & typeof globalThis) | null,
    position: number | "end" | "start"
  ) {
    let angle = this.args[0] as "x" | "y" | "horizontal" | "vertical" | "both";

    if (angle === "x") {
      angle = "horizontal";
    }

    if (angle === "y") {
      angle = "vertical";
    }

    window.addEventListener(
      "resize",
      () => {
        scrollToPosition(
          el,
          position,
          angle as "horizontal" | "vertical" | "both"
        );
      },
      {
        passive: true,
      }
    );

    scrollToPosition(el, position, angle);
  },
};
