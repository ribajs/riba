import { ScrollPosition, ScrollEventsOptions } from "../../types/index.js";
import { getScrollPosition } from "../../helper/scroll.js";
import { BaseEventsService } from "./base-events.service.js";

export class ScrollEventsService extends BaseEventsService {
  public isScrolling = false;

  protected _scrollEvent: Array<"touchmove" | "scroll" | "scrollend">;

  protected delay = 300;

  protected startPosition: ScrollPosition | null = null;

  protected endPosition: ScrollPosition | null = null;

  protected scrollTimer: number | null = null;

  constructor(
    el: HTMLUnknownElement | Window,
    options: Partial<ScrollEventsOptions> = {}
  ) {
    super(el);
    this.el = el;
    this.delay = options.delay || this.delay;
    this.startPosition = getScrollPosition(this.el);
    // Watch also native scrollend to not trigger scrollended before scrollend was triggered
    this._scrollEvent = this.touchCapable
      ? ["touchmove", "scrollend", "scroll"]
      : ["scroll", "scrollend"];
    this.removeEventListeners();
    this.addEventListeners();
  }

  public destroy() {
    this.removeEventListeners();
  }

  public get scrollEvent() {
    return this._scrollEvent;
  }

  protected getScrollDir(
    start: ScrollPosition | null,
    end: ScrollPosition | null
  ) {
    if (!start || !end) {
      return "unknown";
    }
    if (start.x > end.x) {
      return "right";
    }
    if (start.x < end.x) {
      return "left";
    }
    if (start.y > end.y) {
      return "down";
    }
    if (start.y < end.y) {
      return "up";
    }
    return "none";
  }

  protected removeEventListeners() {
    for (const eventName of this._scrollEvent) {
      this.el.removeEventListener(eventName, this.onScrollEvent);
    }
  }

  protected addEventListeners() {
    for (const eventName of this._scrollEvent) {
      this.el.addEventListener(eventName, this.onScrollEvent, {
        passive: true
      });
    }
  }

  protected _onScrollEvent(event: TouchEvent | MouseEvent) {
    if (!event.target) {
      return false;
    }

    if (this.scrollTimer !== null) {
      clearTimeout(this.scrollTimer);
      this.scrollTimer = null;
    }

    if (!this.isScrolling) {
      this.scrollstart(event);
    }

    if (this.isScrolling) {
      this.scroll(event);
    }

    this.scrollTimer = window.setTimeout(() => {
      this.scrollended(event);
    }, this.delay);

    return true;
  }

  protected onScrollEvent = this._onScrollEvent.bind(
    this
  ) as any as EventListener;

  /**
   * scrollended Event
   */
  protected scrollended(event: TouchEvent | MouseEvent) {
    this.isScrolling = false;
    this.endPosition = getScrollPosition(this.el);
    const direction = this.getScrollDir(this.startPosition, this.endPosition);
    this.triggerCustomEvent("scrollended", event, {
      startPosition: this.startPosition,
      endPosition: this.endPosition,
      direction
    });
  }

  /**
   * scrollstart Event
   */
  protected scrollstart(event: TouchEvent | MouseEvent) {
    this.isScrolling = true;
    this.startPosition = getScrollPosition(this.el);
    this.triggerCustomEvent("scrollstart", event, {
      startPosition: this.startPosition
    });
  }

  /**
   * scrolling, scrollup, scrolldown, scrollleft and scrollright Events
   */
  protected _scroll(event: TouchEvent | MouseEvent) {
    const currentPosition = getScrollPosition(this.el);
    const direction = this.getScrollDir(this.startPosition, currentPosition);
    this.triggerCustomEvent("scroll" + direction, event, {
      startPosition: this.startPosition,
      currentPosition,
      direction
    });
    this.triggerCustomEvent("scrolling", event, {
      startPosition: this.startPosition,
      currentPosition,
      direction
    });
  }

  protected scroll = this._scroll.bind(this);
}
