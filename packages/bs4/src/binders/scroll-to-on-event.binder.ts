import { IBinder } from '@ribajs/core';

/**
 * Scrolls to an element by event and selector
 * @see https://stackoverflow.com/a/31987330
 * @param element
 * @param to
 * @param duration
 */
const scrollTo = (to: HTMLElement, offset: number) => {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: (to.getBoundingClientRect().top + window.pageYOffset) - offset,
  });
};

export const scrollToOnEventBinder: IBinder<string> = {
  name: 'scroll-to-on-*',
  bind(el: HTMLUnknownElement) {
    this.customData = {};
    this.customData.onEvent = (event: Event) => {
      const offset = Number(el.dataset.offset || 0);
      scrollTo(this.customData.target, offset);
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
