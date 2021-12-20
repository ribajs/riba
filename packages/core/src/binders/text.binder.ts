import { Binder } from "../binder";

/**
 * Sets the element's text value.
 */
export class TextBinder extends Binder<string, HTMLElement> {
  static key = "text";
  routine(el: HTMLElement, value: number | string | boolean) {

    if (typeof value !== 'string') {
      if (typeof value?.toString === 'function') {
        value = value.toString();
      } else {
        console.warn("[TextBinder] Value is not a string", value);
        value = JSON.stringify(value);
      }
    }

    el.textContent = value || "";
  }
}
