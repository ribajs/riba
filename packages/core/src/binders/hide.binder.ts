import { Binder } from "../interfaces";

/**
 * Hides the element when value is true (negated version of `show` binder).
 */
export const hideBinder: Binder<boolean> = {
  name: "hide",
  routine(el: HTMLElement, value: boolean) {
    el.style.display = value ? "none" : "";
    if (value) {
      el.setAttribute("hidden", "true");
    } else {
      el.removeAttribute("hidden");
    }
  }
};
