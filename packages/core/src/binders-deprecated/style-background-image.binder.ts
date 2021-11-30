import { BinderDeprecated } from "../types";

/**
 * style-*
 * Adds a style to the element.
 *
 * ```html
 * <div rv-style-background-image="'/image.png'"></div>
 * ```
 */
export const styleBackgroundImageBinder: BinderDeprecated<string> = {
  name: "style-background-image",
  routine(el: HTMLElement, value: string) {
    const prop = "background-image";
    if (value === null || value === undefined || value === "") {
      el.style.removeProperty(prop);
    } else {
      el.style.setProperty(prop, `url(${value})`);
    }
  },
};
