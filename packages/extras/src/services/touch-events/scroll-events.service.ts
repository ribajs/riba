// import { Utils as ExtraUtils } from '../utils.service';
import { BaseTouchEventService } from './base-touch-events.service';

export class ScrollEventsService extends BaseTouchEventService {

  public isScrolling = false;

  protected _scrollEvent: Array<'touchmove' | 'scroll' | 'scrollend'>;

  /** The element to trigger the events on */
  protected el: HTMLElement;

  protected scrollTimer: number | null = null;

  constructor(el: HTMLElement) {
    super(el);
    this.el = el;
    // Watch also native scrollend to not trigger scrollended before scrollend was triggered
    this._scrollEvent = this.touchCapable ? ['touchmove', 'scrollend', 'scroll'] : ['scroll', 'scrollend'];
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
      this.el.addEventListener<any>(eventName, this.onScrollEvent.bind(this), {passive: true});
    }
  }

  protected onScrollEvent(event: TouchEvent | MouseEvent) {
    this.scrollstart(event);
    return true;
  }

  /**
   * scrollstart Event
   * (also handles `scrollended`)
   */
  protected scrollstart(event: TouchEvent | MouseEvent) {
    if (!event.target) {
      return false;
    }

    // const scrollPosition = ExtraUtils.getScrollPosition(event.target as HTMLElement);

    if (!this.isScrolling) {
      this.isScrolling = true;
      this.triggerCustomEvent('scrollstart', event, {});
    }

    // console.debug('scroll timer is ', this.scrollTimer);
    if (this.scrollTimer !== null) {
      clearTimeout(this.scrollTimer);
      this.scrollTimer = null;
    }

    this.scrollTimer = window.setTimeout(() => {
      this.triggerCustomEvent('scrollended', event, {});
      this.isScrolling = false;
    }, 200);
  }
}
