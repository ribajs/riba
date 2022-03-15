import { Binder } from "@ribajs/core/src/index.js";
import { scrollToPosition } from "@ribajs/utils/src/dom.js";

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
export class ScrollPositionAngleBinder extends Binder<
  number | "end" | "start",
  HTMLElement | (Window & typeof globalThis) | null
> {
  static key = "scroll-position-*";

  private position?: number | "end" | "start";

  private angle?: "x" | "y" | "horizontal" | "vertical" | "both";

  private _onResize() {
    if (!this.position) {
      throw new Error("postion not defined!");
    }
    if (!this.angle) {
      throw new Error("angle not defined!");
    }
    scrollToPosition(
      this.el,
      this.position,
      this.angle as "horizontal" | "vertical" | "both"
    );
  }

  private onResize = this._onResize.bind(this);

  routine(
    el: HTMLElement | (Window & typeof globalThis) | null,
    position: number | "end" | "start"
  ) {
    this.position = position;
    this.angle = this.args[0] as "x" | "y" | "horizontal" | "vertical" | "both";

    if (this.angle === "x") {
      this.angle = "horizontal";
    }

    if (this.angle === "y") {
      this.angle = "vertical";
    }

    window.addEventListener("resize", this.onResize, {
      passive: true
    });

    scrollToPosition(el, this.position, this.angle);
  }
}
