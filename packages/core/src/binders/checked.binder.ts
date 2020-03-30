import { Binder } from "../interfaces";
import { Utils } from "../services/utils";

/**
 * checked
 * Checks a checkbox or radio input when the value is true. Also sets the model
 * property when the input is checked or unchecked (two-way binder).
 */
export const checkedBinder: Binder<string> = {
  name: "checked",
  publishes: true,
  priority: 2000,

  bind(el) {
    this.customData = {};
    this.customData.onChange = () => {
      this.publish();
    };
    el.addEventListener("change", this.customData.onChange, false);
  },

  unbind(el) {
    el.removeEventListener("change", this.customData.onChange, false);
  },

  routine(el: HTMLElement, value) {
    if ((el as HTMLInputElement).type === "radio") {
      (el as HTMLInputElement).checked =
        Utils.getString((el as HTMLInputElement).value) ===
        Utils.getString(value);
    } else {
      (el as HTMLInputElement).checked = !!value;
    }
  },
};
