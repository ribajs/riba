import { Binder } from "../binder";

/**
 * Hides the element when value is true (negated version of `show` binder).
 */
export class HideBinder extends Binder<boolean, HTMLElement> {
  static key = "hide";
  routine(el: HTMLElement, value: boolean) {
    el.style.display = value ? "none" : "";
    if (value) {
      el.setAttribute("hidden", "true");
    } else {
      el.removeAttribute("hidden");
    }
  }
}
