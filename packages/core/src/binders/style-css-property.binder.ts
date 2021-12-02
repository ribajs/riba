import { Binder } from "../binder";

/**
 * style-*
 * Adds a style to the element.
 *
 * ```html
 * <div rv-style-background-color="'blue'"></div>
 * ```
 */
export class StyleStarBinder extends Binder<string, HTMLElement> {
  static key = "style-*";
  routine(el: HTMLElement, value: string) {
    const propertyName = this.args[0];
    if (value === null || value === undefined || value === "") {
      el.style.removeProperty(propertyName.toString());
    } else {
      el.style.setProperty(propertyName.toString(), value);
    }
  }
};
