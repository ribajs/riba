import { Binder } from '@ribajs/core';
import { scrollTo } from '@ribajs/utils/src/dom';

export const scrollToOnEventBinder: Binder<string> = {
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
