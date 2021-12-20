import { Binder } from "../binder";

/**
 * Sets the element's text value.
 */
export class HtmlBinder extends Binder<number | string | boolean, HTMLElement> {
  static key = "html";
  routine(el: HTMLElement, value: number | string | boolean) {

    if (typeof value !== 'string') {
      if (typeof value?.toString === 'function') {
        value = value.toString();
      } else {
        console.warn("[HtmlBinder] Value is not a string", value);
        value = JSON.stringify(value);
      }
    }

    el.innerHTML = value || "";
  }
}
