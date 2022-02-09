import { Binder } from "../binder";
import { BinderAttributeChangedEvent } from "../types";
import { setAttribute } from "@ribajs/utils";

/**
 * Sets the attribute on the element. If no binder above is matched it will fall
 * back to using this binder.
 */
export class AttributeBinder extends Binder<any, HTMLElement> {
  static key = "attr-*";

  routine(el: HTMLElement, newValue: any) {
    if (!this.type) {
      throw new Error("Can't set attribute of " + this.type);
    }
    const {
      newValue: newValueFormatted,
      oldValue,
      changed,
    } = setAttribute(el, this.type, newValue);

    if (changed) {
      el.dispatchEvent(
        new CustomEvent("binder-changed", {
          detail: { name: this.type, newValue: newValueFormatted, oldValue },
        } as BinderAttributeChangedEvent)
      );
    }
  }
}
