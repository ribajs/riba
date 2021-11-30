import { BinderDeprecated } from "../types";

/**
 * style-*
 * Adds a style to the element.
 *
 * ```html
 * <div rv-style-background-color="'blue'"></div>
 * ```
 */
export const styleStarBinder: BinderDeprecated<string> = {
  name: "style-*",
  routine(el: HTMLElement, value: string) {
    const propertyName = this.args[0];
    if (value === null || value === undefined || value === "") {
      el.style.removeProperty(propertyName.toString());
    } else {
      el.style.setProperty(propertyName.toString(), value);
    }
  },
};
