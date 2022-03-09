import { Binder } from "../binder.js";
import { getInputValue } from "@ribajs/utils/src/dom.js";
import { getString } from "@ribajs/utils/src/type.js";

/**
 * unchecked
 * Unchecks a checkbox or radio input when the value is true (negated version of
 * `checked` binder). Also sets the model property when the input is checked or
 * unchecked (two-way binder).
 */
export class UncheckedBinder extends Binder<
  string | boolean,
  HTMLInputElement
> {
  static key = "unchecked";
  publishes = true;
  priority = 2000;

  onChange = this.publish.bind(this);

  bind(el: HTMLInputElement) {
    el.addEventListener("change", this.onChange);
  }

  unbind(el: HTMLInputElement) {
    el.removeEventListener("change", this.onChange);
  }

  routine(el: HTMLInputElement, value: string | boolean) {
    if (el.type === "radio") {
      el.checked = getString(el.value) !== getString(value);
    } else {
      el.checked = !value;
    }
  }

  getValue(el: HTMLInputElement) {
    return getInputValue(el);
  }
}
