import { BinderDeprecated } from "../types";

/**
 * Sets the element's text value.
 */
export const textBinder: BinderDeprecated<string> = {
  name: "text",
  routine(el: HTMLElement, value: string) {
    el.textContent = value != null ? value : "";
  },
};
