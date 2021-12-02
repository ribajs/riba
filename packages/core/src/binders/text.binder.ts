import { Binder } from "../binder";

/**
 * Sets the element's text value.
 */
export class TextBinder extends Binder<string, HTMLElement> {
  static key = "text";
  routine(el: HTMLElement, value: number | string) {
    el.textContent = value != null ? value.toString() : "";
  }
}
