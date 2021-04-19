import { ScrollPosition } from "../../types";
import { getScrollPosition } from "../../helper/scroll";
import { BaseTouchEventsService } from "./base-touch-events.service";
import { throttle } from "@ribajs/utils/src/control";

export class ScrollEventsService extends BaseTouchEventsService {
  public isScrolling = false;

  protected _scrollEvent: Array<"touchmove" | "scroll" | "scrollend">;

  /** The element to trigger the events on */
  protected el: HTMLUnknownElement | Window;

  protected startPosition: ScrollPosition = {
    maxX: 0,
    maxY: 0,
    x: 0,
    y: 0,
  };

  protected endPosition: ScrollPosition = {
    maxX: 0,
    maxY: 0,
    x: 0,
    y: 0,
  };

  protected scrollTimer: number | null = null;

  constructor(el: HTMLUnknownElement | Window) {
    super(el);
    this.el = el;
    this.startPosition = getScrollPosition(this.el);
    // Watch also native scrollend to not trigger scrollended before scrollend was triggered
    this._scrollEvent = this.touchCapable
      ? ["touchmove", "scrollend", "scroll"]
      : ["scroll", "scrollend"];
    this.onScrollEvent = this.onScrollEvent.bind(this);
    this.addEventListeners();
  }

  public destroy() {
    this.removeEventListeners();
  }

  public get scrollEvent() {
    return this._scrollEvent;
  }

  protected getScrollDir(start: ScrollPosition, end: ScrollPosition) {
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
        passive: true,
      });
    }
  }

  protected onScrollEvent(event: TouchEvent | MouseEvent) {
    if (!event.target) {
      return false;
    }

    if (!this.isScrolling) {
      this.scrollstart(event);
    }

    // console.debug('scroll timer is ', this.scrollTimer);
    if (this.scrollTimer !== null) {
      clearTimeout(this.scrollTimer);
      this.scrollTimer = null;
    }

    this.scrollTimer = window.setTimeout(() => {
      this.scrollended(event);
    }, 200);

    if (this.isScrolling) {
      this.scroll(event);
    }

    return true;
  }

  /**
   * scrollended Event
   */
  protected scrollended(event: TouchEvent | MouseEvent) {
    this.isScrolling = false;
    this.endPosition = getScrollPosition(this.el);
    this.triggerCustomEvent("scrollended", event, {
      startPosition: this.startPosition,
      endPosition: this.endPosition,
      direction: this.getScrollDir(this.startPosition, this.endPosition),
    });
  }

  /**
   * scrollstart Event
   */
  protected scrollstart(event: TouchEvent | MouseEvent) {
    this.isScrolling = true;
    this.startPosition = getScrollPosition(this.el);
    this.triggerCustomEvent("scrollstart", event, {
      startPosition: this.startPosition,
    });
  }

  /**
   * scrolling, scrollup, scrolldown, scrollleft and scrollright Events
   */
  protected _scroll(event: TouchEvent | MouseEvent) {
    const currentPosition = getScrollPosition(this.el);
    const direction = this.getScrollDir(this.startPosition, this.endPosition);
    this.triggerCustomEvent("scroll" + direction, event, {
      startPosition: this.startPosition,
      currentPosition,
      direction,
    });
    this.triggerCustomEvent("scrolling", event, {
      startPosition: this.startPosition,
      currentPosition,
      direction,
    });
  }

  protected scroll = throttle(this._scroll.bind(this), 100);
}
