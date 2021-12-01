import { Binder } from "../binder";

/**
 * Sets the element's text value.
 */
export class htmlBinder extends Binder<number | string | boolean, HTMLElement> {
  static key = "html";
  routine(el: HTMLElement, value: number | string | boolean) {
    el.innerHTML = typeof value !== "undefined" ? value.toString() : "";
  }
};
