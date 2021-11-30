import { BinderDeprecated } from "../types";
import { getInputValue } from "@ribajs/utils/src/dom";
import { getString } from "@ribajs/utils/src/type";

/**
 * unchecked
 * Unchecks a checkbox or radio input when the value is true (negated version of
 * `checked` binder). Also sets the model property when the input is checked or
 * unchecked (two-way binder).
 */
export const uncheckedBinder: BinderDeprecated<string> = {
  name: "unchecked",
  publishes: true,
  priority: 2000,

  bind(el) {
    this.customData = {
      onChange: () => {
        this.publish.bind(this);
      },
    };
    el.addEventListener("change", this.customData.onChange);
  },

  unbind(el) {
    el.removeEventListener("change", this.customData.onChange);
  },

  routine(el: HTMLElement, value) {
    if ((el as HTMLInputElement).type === "radio") {
      (el as HTMLInputElement).checked =
        getString((el as HTMLInputElement).value) !== getString(value);
    } else {
      (el as HTMLInputElement).checked = !value;
    }
  },

  getValue: getInputValue,
};
