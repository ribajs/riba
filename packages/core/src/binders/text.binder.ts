import { Binder } from "../binder";

/**
 * Sets the element's text value.
 */
export class textBinder extends Binder<string, HTMLElement> {
  static key = "text";
  routine(el: HTMLElement, value: number | string) {
    el.textContent = value != null ? value.toString() : "";
  }
}
