import { Binder } from "../binder.js";

/**
 * Sets the element's text value.
 */
export class TextBinder extends Binder<string, HTMLElement> {
  static key = "text";
  routine(el: HTMLElement, value: any) {
    if (typeof value !== "string") {
      if (typeof value?.toString === "function") {
        value = value.toString();
      } else {
        // console.warn(
        //   `[TextBinder] Can't convert value "${value}" to string! Element: `,
        //   el
        // );
      }
    }

    el.textContent = value || "";
  }
}
