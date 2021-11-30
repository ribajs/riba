/* eslint-disable @typescript-eslint/no-this-alias */
import { BinderDeprecated } from "../types";
import { getInputValue } from "@ribajs/utils/src/dom";
import { getString } from "@ribajs/utils/src/type";

/**
 * checked
 * Checks a checkbox or radio input when the value is true. Also sets the model
 * property when the input is checked or unchecked (two-way binder).
 */
export const checkedBinder: BinderDeprecated<string | boolean> = {
  name: "checked",
  publishes: true,
  priority: 2000,

  bind(el) {
    this.customData = {
      onChange: this.publish.bind(this),
    };

    el.addEventListener("change", this.customData.onChange);
  },

  unbind(el) {
    el.removeEventListener(this.customData.event, this.customData.onChange);
  },

  routine(el: HTMLElement, newValue) {
    const oldValue = this.getValue(el);
    if ((el as HTMLInputElement).type === "radio") {
      (el as HTMLInputElement).checked =
        getString(oldValue) === getString(newValue);
    } else {
      if (oldValue !== newValue) {
        (el as HTMLInputElement).checked = !!newValue;
      }
    }
  },

  getValue: getInputValue,
};
