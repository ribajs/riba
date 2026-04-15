import { AttributeBinder, View } from "@ribajs/core";
import { TwAbstractBreakpointBinder } from "./tw-abstract-breakpoint.binder.js";

/**
 * Responsive attribute breakpoint binder.
 *
 * Sets HTML attributes only at certain breakpoints (viewport widths).
 *
 * @example
 * ```html
 * <img
 *   rv-tw-attr-sm-src="'https://picsum.photos/500/200'"
 *   rv-tw-attr-md-src="'https://picsum.photos/1000/500'"
 *   rv-tw-attr-lg-src="'https://picsum.photos/1400/700'"
 * />
 * ```
 */
export class TwAttributeBreakpointBinder extends TwAbstractBreakpointBinder<HTMLElement> {
  static key = "tw-attr-*-*";

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
