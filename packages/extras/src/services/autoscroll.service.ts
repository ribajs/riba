import { getScrollPosition } from "../helper/scroll";
import { Gameloop } from "./gameloop.service";
import { throttle } from "@ribajs/utils/src/control";

export interface AutoscrollOptions {
  angle?: "vertical" | "horizontal";
  direction?: 1 | -1;
  velocity?: number;
  width?: string;
  pauseOnHover?: boolean;
}

export class Autoscroll {
  protected touchCapable = "ontouchstart" in window;

  protected direction = 1;

  protected limit: number;

  protected options: AutoscrollOptions;

  protected el: HTMLElement;

  protected _pause = false;

  protected velocity = 0.008;

  protected move = 0;

  protected lastMove = 0;

  protected angle: "horizontal" | "vertical" = "horizontal";

  protected pauseOnHover = true;

  protected resumeTimer: number | null = null;

  constructor(el: HTMLElement, options: AutoscrollOptions = {}) {
    this.el = el;
    this.options = options;
    this.direction = this.options.direction || this.direction;
    this.velocity = this.options.velocity || this.velocity;
    this.angle = this.options.angle || this.angle;
    this.pauseOnHover =
      typeof this.options.pauseOnHover === "boolean"
        ? this.options.pauseOnHover
        : this.pauseOnHover;

    this.limit = this.getLimit(this.el);
    this.move = this.getPosition();

    if (this.direction === -1) {
      // start right
      this.el.scrollLeft = this.limit;
    } else {
      // start left
      this.el.scrollLeft = 0;
    }

    this.addEventListeners();

    Gameloop.startLoop({ maxFPS: 60 });
  }

  /**
   * @note this is not the gameloop update method!
   */
  public update() {
    this.limit = this.getLimit(this.el);
    this.setPosition();
  }

  public destroy() {
    this.removeEventListeners();
  }

  public pause() {
    this.el.style.scrollBehavior = "";
    this._pause = true;
  }

  /** Resume autoscrolling if this method was not called up for [delay] milliseconds */
  public resume(delay = 0) {
    if (!this._pause) {
      return;
    }

    this.stopResumeTimeout();

    this.resumeTimer = window.setTimeout(() => {
      this.setPosition();
      this._pause = false;
      // Disable smooth scrolling on autoscroll if set
      this.el.style.scrollBehavior = "auto";
    }, delay);
  }

  protected addEventListeners() {
    this.removeEventListeners();
    this.onResize = this.onResize.bind(this);
    this.onMouseIn = this.onMouseIn.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.render = this.render.bind(this);
    this.updateMove = this.updateMove.bind(this);

    window.addEventListener("resize", this.onResize, {
      passive: true,
    });

    this.el.addEventListener("mouseenter", this.onMouseIn, {
      passive: true,
    });
    this.el.addEventListener("mouseover", this.onMouseIn, {
      passive: true,
    });
    this.el.addEventListener("focusin", this.onMouseIn, {
      passive: true,
    });
    this.el.addEventListener("touchstart", this.onMouseIn, {
      passive: true,
    });

    this.el.addEventListener("mouseleave", this.onMouseOut, {
      passive: true,
    });
    this.el.addEventListener("focusout", this.onMouseOut, {
      passive: true,
    });

    this.el.addEventListener("mouseup", this.onMouseUp, {
      passive: true,
    });
    this.el.addEventListener("touchend", this.onMouseUp, {
      passive: true,
    });

    if (this.touchCapable) {
      this.el.addEventListener("scroll", this.onMouseUp, {
        passive: true,
      });
      this.el.addEventListener("scrollend", this.onMouseUp, {
        passive: true,
      });
      // See ScrollEventsService for "scrollended" event
      this.el.addEventListener("scrollended", this.onMouseUp, {
        passive: true,
      });
    } else {
      this.el.addEventListener("scroll", this.onScroll, {
        passive: true,
      });
      this.el.addEventListener("scrollend", this.onScroll, {
        passive: true,
      });
      this.el.addEventListener("scrollended", this.onScroll, {
        passive: true,
      });
    }

    Gameloop.events.on("render", this.render);
    Gameloop.events.on("update", this.updateMove);
  }

  protected removeEventListeners() {
    window.removeEventListener("resize", this.onResize);

    this.el.removeEventListener("mouseenter", this.onMouseIn);
    this.el.removeEventListener("mouseover", this.onMouseIn);
    this.el.removeEventListener("focusin", this.onMouseIn);
    this.el.removeEventListener("touchstart", this.onMouseIn);

    this.el.removeEventListener("mouseleave", this.onMouseOut);
    this.el.removeEventListener("focusout", this.onMouseOut);

    this.el.removeEventListener("mouseup", this.onMouseUp);
    this.el.removeEventListener("touchend", this.onMouseUp);

    if (this.touchCapable) {
      this.el.removeEventListener("scroll", this.onMouseUp);
      this.el.removeEventListener("scrollend", this.onMouseUp);
      this.el.removeEventListener("scrollended", this.onMouseUp);
    } else {
      this.el.removeEventListener("scroll", this.onScroll);
      this.el.removeEventListener("scrollend", this.onScroll);
      this.el.removeEventListener("scrollended", this.onScroll);
    }

    Gameloop.events.off("render", this.render);
    Gameloop.events.off("update", this.updateMove);
  }

  protected onMouseIn() {
    if (this.pauseOnHover) {
      this.pause();
    }
  }

  protected onMouseOut() {
    this.resume(200);
  }

  protected onMouseUp() {
    this.resume(1000);
  }

  protected _onResize() {
    this.limit = this.getLimit(this.el);
    this.resume(200);
  }

  protected onResize = throttle(this._onResize.bind(this));

  protected _onScroll() {
    this.stopResumeTimeout();
  }

  protected onScroll = throttle(this._onScroll.bind(this));

  protected stopResumeTimeout() {
    if (this.resumeTimer !== null) {
      clearTimeout(this.resumeTimer);
      this.resumeTimer = null;
    }
  }

  protected getPosition() {
    return (
      (this.angle === "vertical" ? this.el.scrollTop : this.el.scrollLeft) || 0
    );
  }

  protected setPosition() {
    this.move = this.getPosition();
  }

  protected getLimit(el: HTMLElement) {
    return this.angle === "vertical"
      ? getScrollPosition(el).maxY
      : getScrollPosition(el).maxX;
  }

  /**
   * This Interpolation:
   * ```
   * protected render(Interpolation: number) {
   * ...
   * this.move = (this.lastMove + (this.move - this.lastMove) * Interpolation);
   * ```
   * is not working here for some reason
   * like it works in the demos/extras-game-loop demo or here:
   * https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
   *
   * Without this the scrollbar scrolls smooth, need to find out why.
   */
  protected render() {
    if (this._pause) {
      return;
    }

    this.scroll(this.move);
  }

  protected updateMove(delta: number) {
    if (this._pause) {
      return;
    }

    this.lastMove = this.move;
    const append = this.velocity * this.direction * delta;
    this.move += append;

    // Switch directions if we go too far
    if (this.move <= 0 && this.direction !== 1) {
      this.direction = 1;
    }

    if (this.move >= this.limit && this.direction !== -1) {
      this.direction = -1;
    }
  }

  protected scroll(move: number) {
    if (this.angle === "vertical") {
      this.el.scrollTop = move;
    } else {
      this.el.scrollLeft = move;
    }
  }
}
