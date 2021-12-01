import { jsonFormatter } from "../formatters/type/json.formatter";
import { Binder } from "../binder";
import { BinderAttributeChangedEvent } from "../types";

/**
 * Sets the attribute on the element. If no binder above is matched it will fall
 * back to using this binder.
 */
export class attributeBinder extends Binder<string, HTMLElement> {
  static key = "*";

  routine(el: HTMLElement, newValue: any) {
    if (!this.type) {
      throw new Error("Can't set attribute of " + this.type);
    }

    const oldValue = el.getAttribute(this.type);
    let newValueFormatted: any;
    switch (typeof newValue) {
      case "string":
        newValueFormatted = newValue;
        break;
      case "number":
        newValueFormatted = newValue;
        break;
      case "boolean":
        newValueFormatted = newValue;
        break;
      case "object":
        if (newValue === null) {
          newValue = null;
        } else {
          newValueFormatted = jsonFormatter.read(newValue, 0);
        }
        break;
      default:
        newValueFormatted = newValue;
        break;
    }

    if (newValueFormatted != null) {
      if (
        String(oldValue).toString() !== String(newValueFormatted).toString()
      ) {
        el.setAttribute(this.type, newValueFormatted);
        el.dispatchEvent(
          new CustomEvent("binder-changed", {
            detail: { name: this.type, newValue: newValueFormatted, oldValue },
          } as BinderAttributeChangedEvent)
        );
      }
    } else {
      el.removeAttribute(this.type);
      el.dispatchEvent(
        new CustomEvent("binder-changed", {
          detail: { name: this.type, newValue: newValueFormatted, oldValue },
        } as BinderAttributeChangedEvent)
      );
    }
  }
}
