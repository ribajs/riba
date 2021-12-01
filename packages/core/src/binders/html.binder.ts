import { Binder } from "../binder";

/**
 * Sets the element's text value.
 */
export class htmlBinder extends Binder<string, HTMLElement> {
  key = "html";
  routine(el: HTMLElement, value: string) {
    el.innerHTML = typeof value !== "undefined" ? value : "";
  }
};
