import { Binder } from "../binder";
import { kebabCase } from "@ribajs/utils";

/**
 * style
 * Adds a style to the element.
 *
 * ```html
 * <div rv-style="{'backgroundColor':'blue'}"></div>
 * ```
 */
export class StyleBinder extends Binder<
  Partial<CSSStyleDeclaration> | string,
  HTMLElement
> {
  static key = "style";
  routine(el: HTMLElement, value: Partial<CSSStyleDeclaration> | string) {
    if (value) {
      if (typeof value === "string") {
        el.setAttribute("style", value);
      } else {
        for (const key of Object.keys(value)) {
          el.style.setProperty(kebabCase(key), value[key as any] || null);
        }
      }
    } else {
      for (const key of Object.keys(el.style)) {
        (el.style as any).removeProperty(key);
      }
    }
  }
}
