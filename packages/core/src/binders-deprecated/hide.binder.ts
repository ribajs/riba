import { BinderDeprecated } from "../types";

/**
 * Hides the element when value is true (negated version of `show` binder).
 */
export const hideBinder: BinderDeprecated<boolean> = {
  name: "hide",
  routine(el: HTMLElement, value: boolean) {
    el.style.display = value ? "none" : "";
    if (value) {
      el.setAttribute("hidden", "true");
    } else {
      el.removeAttribute("hidden");
    }
  },
};
