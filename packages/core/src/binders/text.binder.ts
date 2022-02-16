import { Binder } from "../binder";
import { jsonStringify } from "@ribajs/utils";

/**
 * Sets the element's text value.
 */
export class TextBinder extends Binder<string, HTMLElement> {
  static key = "text";
  routine(el: HTMLElement, value: any) {
    if (value && typeof value !== "string") {
      if (typeof value === "object") {
        value = jsonStringify(value);
      } else if (typeof value.toString === "function") {
        value = value.toString();
      } else {
        console.error("[TextBinder] Can't convert value to string: ", value);
      }
    }

    el.textContent = value || "";
  }
}
