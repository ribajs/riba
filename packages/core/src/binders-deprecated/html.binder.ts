import { BinderDeprecated } from "../types";

/**
 * Sets the element's text value.
 */
export const htmlBinder: BinderDeprecated<string> = {
  name: "html",
  routine(el: HTMLElement, value: string) {
    el.innerHTML = typeof value !== "undefined" ? value : "";
  },
};
