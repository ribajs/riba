import { AttributeBinder, View } from "@ribajs/core";
import { Bs5AbstractBreakpointBinder } from "./bs5-abstract-breakpoint.binder.js";

/**
 * Responsive attribute breakpoint binder
 * This binder is used to pass attributes to an element that should only be set at certain breakpoints (viewport widths).
 * @example
 * ```html
 *  <img
 *    rv-bs5-attr-xxs-src="'https://picsum.photos/100'"
 *    rv-bs5-attr-xs-src="'https://picsum.photos/200'"
 *    rv-bs5-attr-sm-src="'https://picsum.photos/500/200'"
 *    rv-bs5-attr-md-src="'https://picsum.photos/1000/500'"
 *
 *    rv-bs5-attr-xxs-alt="'Image for very small displays'"
 *    rv-bs5-attr-xs-src="'Image for small displays'"
 *    rv-bs5-attr-sm-src="'Image for smartphones'"
 *    rv-bs5-attr-md-src="'Image for tablets and small laptops'"
 *  />
 * ```
 */
export class Bs5AttributeBreakpointBinder extends Bs5AbstractBreakpointBinder<HTMLElement> {
  static key = "bs5-attr-*-*";

  defaultAttributeBinder: AttributeBinder;

  constructor(
    view: View,
    el: HTMLElement,
    type: string | null,
    name: string,
    keypath: string | undefined,
    formatters: string[] | null,
    identifier: string | null,
  ) {
    super(view, el, type, name, keypath, formatters, identifier);
    this.defaultAttributeBinder = new AttributeBinder(
      view,
      el,
      this.attributeName,
      name,
      keypath,
      formatters,
      "*",
    );
  }
}
