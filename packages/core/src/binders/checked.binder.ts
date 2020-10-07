/* eslint-disable @typescript-eslint/no-this-alias */
import { Binder } from "../interfaces";
import { getInputValue } from "@ribajs/utils/src/dom";
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

  onChange() {
    this.publish();
  },

  bind(el) {
    const self = this;
    this.customData = this.customData || {};

    if (!this.customData.onChange) {
      this.customData.onChange = () => {
        self.publish();
      };
    }

    el.addEventListener("change", this.customData.onChange, false);
    // el.addEventListener("click", this.customData.onChange, false);
    // el.addEventListener("input", this.customData.onChange, false);
    // el.addEventListener("focus", this.customData.onChange, false);
    // el.addEventListener("blur", this.customData.onChange, false);

    (el as HTMLInputElement).checked = !!(el as HTMLInputElement).checked;
  },

  unbind(el) {
    el.removeEventListener(this.customData.event, this.customData.onChange);
    // el.addEventListener("click", this.customData.onChange);
    // el.addEventListener("input", this.customData.onChange);
    // el.addEventListener("focus", this.customData.onChange);
    // el.addEventListener("blur", this.customData.onChange);
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
