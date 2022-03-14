import { Binder } from "../binder.js";
import { getInputValue } from "@ribajs/utils/src/dom.js";
import { getString } from "@ribajs/utils/src/type.js";

/**
 * checked
 * Checks a checkbox or radio input when the value is true. Also sets the model
 * property when the input is checked or unchecked (two-way binder).
 */
export class CheckedBinder extends Binder<string | boolean, HTMLInputElement> {
  static key = "checked";
  publishes = true;
  priority = 2000;

  onChange = this.publish.bind(this);

  bind(el: HTMLInputElement) {
    el.addEventListener("change", this.onChange);
  }

  unbind(el: HTMLInputElement) {
    el.removeEventListener("change", this.onChange);
  }

  routine(el: HTMLInputElement, newValue: string | boolean) {
    let oldValue;
    if (!this._getValue) {
      console.warn("this._getValue is not a function, this: ", this);
      oldValue = getInputValue(el);
    } else {
      oldValue = this._getValue(el);
    }
    if (el.type === "radio") {
      el.checked = getString(oldValue) === getString(newValue);
    } else {
      if (oldValue !== newValue) {
        el.checked = !!newValue;
      }
    }
  }

  getValue(el: HTMLInputElement) {
    return getInputValue(el);
  }
}
