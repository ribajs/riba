import { Binder } from "@ribajs/core/src/index.js";
import { scrollTo } from "@ribajs/utils/src/dom.js";

export class ScrollToOnEventBinder extends Binder<string, HTMLInputElement> {
  static key = "scroll-to-on-*";

  private target?: HTMLElement;

  private _onEvent(event: Event) {
    const offset = Number(this.el.dataset.offset || 0);
    const scrollElement = this.el.dataset.scrollElement
      ? document.querySelector<HTMLElement>(this.el.dataset.scrollElement)
      : window;
    if (this.target) {
      scrollTo(this.target, offset, scrollElement);
      event.preventDefault();
    }
  }

  private onEvent = this._onEvent.bind(this);

  bind(el: HTMLUnknownElement) {
    this.onEvent = this.onEvent.bind(this);
    const eventName = this.args[0] as string;
    el.addEventListener(eventName, this.onEvent, { passive: true });
  }

  routine(el: HTMLUnknownElement, targetSelector: string) {
    this.target =
      document.querySelector<HTMLElement>(targetSelector) || undefined;
  }

  unbind(el: HTMLElement) {
    const eventName = this.args[0] as string;
    el.removeEventListener(eventName, this.onEvent);
  }
}
