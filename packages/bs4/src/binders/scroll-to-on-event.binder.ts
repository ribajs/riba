import { Binder } from "@ribajs/core";
import { scrollTo } from "@ribajs/utils/src/dom";

export const scrollToOnEventBinder: Binder<string> = {
  name: "scroll-to-on-*",
  bind(el: HTMLUnknownElement) {
    this.customData = {
      onEvent: function (event: Event) {
        const offset = Number(el.dataset.offset || 0);
        const scrollElement = el.dataset.scrollElement
          ? document.querySelector<HTMLElement>(el.dataset.scrollElement)
          : window;
        if (this.customData.target) {
          scrollTo(this.customData.target, offset, scrollElement);
          event.preventDefault();
        }
      },
    };
    this.customData.onEvent = this.customData.onEvent.bind(this);
    const eventName = this.args[0] as string;
    el.addEventListener(eventName, this.customData.onEvent, { passive: true });
  },
  routine(el: HTMLUnknownElement, targetSelector: string) {
    this.customData.target = document.querySelector(targetSelector);
  },
  unbind(el: HTMLElement) {
    const eventName = this.args[0] as string;
    el.removeEventListener(eventName, this.customData.onEvent);
  },
};
