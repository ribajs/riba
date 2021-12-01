import { Binder } from "../binder";

/**
 * Shows the element when value is true (negated version of `hide` binder).
 */
export class showBinder extends Binder<boolean, HTMLElement> {
  static key = "show";
  routine(el: HTMLElement, value: boolean) {
    el.style.display = value ? "" : "none";
    if (value) {
      el.removeAttribute("hidden");
    } else {
      el.setAttribute("hidden", "true");
    }
  }
}

