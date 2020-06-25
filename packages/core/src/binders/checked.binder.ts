import { Binder } from "../interfaces";
import { getString } from "@ribajs/utils/src/type";

/**
 * checked
 * Checks a checkbox or radio input when the value is true. Also sets the model
 * property when the input is checked or unchecked (two-way binder).
 */
export const checkedBinder: Binder<string | boolean> = {
  name: "checked",
  publishes: true,
  priority: 2000,

  bind(el) {
    el.addEventListener("change", this.publish);
    (el as HTMLInputElement).checked = !!(el as HTMLInputElement).checked;
  },

  unbind(el) {
    el.removeEventListener("change", this.publish);
  },

  routine(el: HTMLElement, value) {
    if ((el as HTMLInputElement).type === "radio") {
      (el as HTMLInputElement).checked =
        getString((el as HTMLInputElement).value) === getString(value);
    } else {
      (el as HTMLInputElement).checked = !!value;
    }
  },

  getValue(el) {
    return !!(el as HTMLInputElement).checked;
  },
};
