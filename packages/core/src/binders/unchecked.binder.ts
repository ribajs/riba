import { Binder } from "../interfaces";
import { getString } from "@ribajs/utils/src/type";

/**
 * unchecked
 * Unchecks a checkbox or radio input when the value is true (negated version of
 * `checked` binder). Also sets the model property when the input is checked or
 * unchecked (two-way binder).
 */
export const uncheckedBinder: Binder<string> = {
  name: "unchecked",
  publishes: true,
  priority: 2000,

  bind(el) {
    el.addEventListener("change", this.publish);
  },

  unbind(el) {
    el.removeEventListener("change", this.publish);
  },

  routine(el: HTMLElement, value) {
    if ((el as HTMLInputElement).type === "radio") {
      (el as HTMLInputElement).checked =
        getString((el as HTMLInputElement).value) !== getString(value);
    } else {
      (el as HTMLInputElement).checked = !value;
    }
  },
};
