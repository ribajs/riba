import { IBinder } from '@ribajs/core';

/**
 * Scrolls to an element by event and selector
 *
 * Attributes:
 *  * scroll-element="query-selector"
 * @see https://stackoverflow.com/a/31987330
 * @param element
 * @param to
 * @param duration
 */
const scrollTo = (to: HTMLElement, offset: number, scrollElement: Element | (Window & typeof globalThis) | null) => {
  if (!scrollElement) {
    scrollElement = window;
  }

  if (typeof((scrollElement as Window).pageYOffset) === 'number') {
    // if is is window to scroll
    scrollElement.scroll({
      behavior: 'smooth',
      left: 0,
      top: (to.getBoundingClientRect().top + (scrollElement as Window).pageYOffset) - offset,
    });
  } else {
    // if is is another element to scroll
    scrollElement.scroll({
      behavior: 'smooth',
      left: 0,
      top: (to.offsetTop ) - offset,
    });
  }
};

export const scrollToOnEventBinder: IBinder<string> = {
  name: 'scroll-to-on-*',
  bind(el: HTMLUnknownElement) {
    this.customData = {};
    this.customData.onEvent = (event: Event) => {
      const offset = Number(el.dataset.offset || 0);
      const scrollElement = el.dataset.scrollElement ? document.querySelector(el.dataset.scrollElement) : window;
      scrollTo(this.customData.target, offset, scrollElement);
      event.preventDefault();
    };
    const eventName = this.args[0] as string;
    el.addEventListener(eventName, this.customData.onEvent);
  },
  routine(el: HTMLUnknownElement, targetSelector: string) {
    if (this.args === null) {
      throw new Error('args is null');
    }
    const eventName = this.args[0] as string;
    this.customData.target = document.querySelector(targetSelector);
    el.addEventListener(eventName, this.customData.onEvent);
  },
  unbind(el: HTMLElement) {
    const eventName = this.args[0] as string;
    el.removeEventListener(eventName, this.customData.onEvent);
  },
};
