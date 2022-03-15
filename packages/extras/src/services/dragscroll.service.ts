import { isScrollable } from "../helper/scroll";
import { throttle } from "@ribajs/utils/src/control";

export interface DragscrollOptions {
  detectGlobalMove?: boolean;
}

/**
 * Scroll an scrollable element by dragging and moving your mouse.
 * inspired by https://github.com/asvd/dragscroll
 */
export class Dragscroll {
  protected options: DragscrollOptions;
  protected lastClientX = 0;
  protected lastClientY = 0;
  protected el: HTMLElement;
  protected pushed = false;
  protected touchCapable = "ontouchstart" in window;

  constructor(
    el: HTMLElement,
    options: DragscrollOptions = { detectGlobalMove: true }
  ) {
    this.el = el;
    this.options = options;

    if (this.touchCapable) {
      // Do noting on touch devices
      return this;
    }

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.checkDraggable = this.checkDraggable.bind(this);

    el.removeEventListener("mousedown", this.onMouseDown);
    el.addEventListener("mousedown", this.onMouseDown, {
      passive: true
    });

    window.addEventListener("resize", this.checkDraggable);

    // Use global move if your element does not use the full width / height
    if (this.options.detectGlobalMove) {
      window.removeEventListener("mouseup", this.onMouseUp);
      window.removeEventListener("mousemove", this.onMouseMove);

      window.addEventListener("mouseup", this.onMouseUp, {
        passive: true
      });
      window.addEventListener("mousemove", this.onMouseMove, {
        passive: true
      });
    } else {
      el.removeEventListener("mouseup", this.onMouseUp);
      el.removeEventListener("mousemove", this.onMouseMove);

      el.addEventListener("mouseup", this.onMouseUp, {
        passive: true
      });
      el.addEventListener("mousemove", this.onMouseMove, {
        passive: true
      });
    }

    // initial
    this.checkDraggable();
  }

  public destroy() {
    this.removeEventListeners();
    this.el.classList.remove("draggable");
  }

  protected _checkDraggable() {
    if (isScrollable(this.el)) {
      this.el.classList.add("draggable");
    } else {
      this.el.classList.remove("draggable");
    }
  }

  public checkDraggable = throttle(this._checkDraggable.bind(this));

  protected onMouseDown(e: MouseEvent) {
    this.pushed = true;
    this.lastClientX = e.clientX;
    this.lastClientY = e.clientY;
  }

  protected onMouseUp() {
    this.pushed = false;
  }

  protected onMouseMove(e: MouseEvent) {
    let newScrollX = 0;
    let newScrollY = 0;
    if (this.pushed) {
      this.el.scrollLeft -= newScrollX =
        -this.lastClientX + (this.lastClientX = e.clientX);
      this.el.scrollTop -= newScrollY =
        -this.lastClientY + (this.lastClientY = e.clientY);
      if (this.el === document.body) {
        if (document.documentElement) {
          this.el = document.documentElement;
        }
        this.el.scrollLeft -= newScrollX;
        this.el.scrollTop -= newScrollY;
      }
    }
  }

  protected removeEventListeners() {
    window.removeEventListener("resize", this.checkDraggable);
    this.el.removeEventListener("mousedown", this.onMouseDown);
    this.el.removeEventListener("mouseup", this.onMouseUp);
    this.el.removeEventListener("mousemove", this.onMouseMove);
  }
}
