import { Binder } from "../binder";

/**
 * style-*
 * Adds a style to the element.
 *
 * ```html
 * <div rv-style-background-image="'/image.png'"></div>
 * ```
 */
export class StyleBackgroundImageBinder extends Binder<string, HTMLElement> {
  static key = "style-background-image";
  routine(el: HTMLElement, value: string) {
    const prop = "background-image";
    if (value === null || value === undefined || value === "") {
      el.style.removeProperty(prop);
    } else {
      el.style.setProperty(prop, `url(${value})`);
    }
  }
};
