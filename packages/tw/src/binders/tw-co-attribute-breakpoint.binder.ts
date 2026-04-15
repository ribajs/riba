import { BasicComponent, ComponentAttributeBinder, View } from "@ribajs/core";
import { TwAbstractBreakpointBinder } from "./tw-abstract-breakpoint.binder.js";

/**
 * Responsive component attribute breakpoint binder.
 *
 * Passes attributes to Riba Components that should only be set at certain breakpoints.
 *
 * @example
 * ```html
 * <custom-image-component
 *   rv-tw-co-sm-src="'https://picsum.photos/500/200'"
 *   rv-tw-co-md-src="'https://picsum.photos/1000/500'"
 * />
 * ```
 */
export class TwComponentAttributeBreakpointBinder extends TwAbstractBreakpointBinder<BasicComponent> {
  static key = "tw-co-*-*";

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
