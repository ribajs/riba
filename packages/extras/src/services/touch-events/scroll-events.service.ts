import { BaseTouchEventService } from './base-touch-events.service';

export class ScrollEventsService extends BaseTouchEventService {

  public isScrolling = false;

  protected _scrollEvent: Array<'touchmove' | 'scroll'>;

  /** The element to trigger the events on */
  protected el: HTMLElement;

  protected scrollTimer: number | null = null;

  constructor(el: HTMLElement) {
    super(el);
    this.el = el;
    this._scrollEvent = this.touchCapable ? ['touchmove'] : ['scroll'];
    this.addEventListeners();
  }

  public removeEventListeners() {
    for (const eventName of this._scrollEvent) {
      this.el.removeEventListener<any>(eventName, this.onScrollEvent.bind(this));
    }
  }

  public get scrollEvent() {
    return this._scrollEvent;
  }

  protected addEventListeners() {
    for (const eventName of this._scrollEvent) {
      this.el.addEventListener<any>(eventName, this.onScrollEvent.bind(this), false);
    }
  }

  protected onScrollEvent(event: TouchEvent | MouseEvent) {
    this.scrollstart(event);
    return true;
  }

  /**
   * scrollstart Event
   * (also handles `scrollEnd`)
   */
  protected scrollstart(event: TouchEvent | MouseEvent) {
    if (!event.target) {
      return false;
    }

    if (!this.isScrolling) {
      this.isScrolling = true;
      this.triggerCustomEvent('scrollStart', event, {});
    }

    // console.debug('scroll timer is ', this.scrollTimer);
    if (this.scrollTimer !== null) {
      clearTimeout(this.scrollTimer);
      this.scrollTimer = null;
    }

    this.scrollTimer = setTimeout(() => {
      this.triggerCustomEvent('scrollEnd', event, {});
      this.isScrolling = false;
    }, 100);
  }
}
