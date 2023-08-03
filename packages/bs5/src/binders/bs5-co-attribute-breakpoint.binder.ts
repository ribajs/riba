import { BasicComponent, ComponentAttributeBinder, View } from "@ribajs/core";
import { Bs5AbstractBreakpointBinder } from "./bs5-abstract-breakpoint.binder.js";

/**
 * Responsive component attribute breakpoint binder
 * This binder is used to pass attributes to an Riba Component (directly) that should only be set at certain breakpoints (viewport widths).
 * @example
 * ```html
 *  <custom-image-component
 *    rv-bs5-co-xxs-src="'https://picsum.photos/100'"
 *    rv-bs5-co-xs-src="'https://picsum.photos/200'"
 *    rv-bs5-co-sm-src="'https://picsum.photos/500/200'"
 *    rv-bs5-co-md-src="'https://picsum.photos/1000/500'"
 *
 *    rv-bs5-co-xxs-alt="'Image for very small displays'"
 *    rv-bs5-co-xs-src="'Image for small displays'"
 *    rv-bs5-co-sm-src="'Image for smartphones'"
 *    rv-bs5-co-md-src="'Image for tablets and small laptops'"
 *  />
 * ```
 */
export class Bs5ComponentAttributeBreakpointBinder extends Bs5AbstractBreakpointBinder<BasicComponent> {
  static key = "bs5-co-*-*";

  defaultAttributeBinder: ComponentAttributeBinder;

  constructor(
    view: View,
    el: BasicComponent,
    type: string | null,
    name: string,
    keypath: string | undefined,
    formatters: string[] | null,
    identifier: string | null,
  ) {
    super(view, el, type, name, keypath, formatters, identifier);
    this.defaultAttributeBinder = new ComponentAttributeBinder(
      view,
      el,
      `co-${this.attributeName}`,
      name,
      keypath,
      formatters,
      ComponentAttributeBinder.key,
    );
  }
}
