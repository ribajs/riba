import { Binder } from "../interfaces";

/**
 * style-*
 * Adds a style to the element.
 *
 * ```html
 * <div rv-style-background-color="'blue'"></div>
 * ```
 */
export const cssStarBinder: Binder<string> = {
  name: "style-*",
  routine(el: HTMLElement, value: string) {
    const propertyName = this.args[0];
    if (value === null || value === undefined || value === "") {
      (el.style as any).removeProperty(propertyName);
    } else {
      (el.style as any).setProperty(propertyName, value);
    }
  },
};
