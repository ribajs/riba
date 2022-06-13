import { BasicComponent, ComponentAttributeBinder, View } from "@ribajs/core";
import { Bs5AbstractBreakpointBinder } from "./bs5-abstract-breakpoint.binder.js";

/**
 * Responsive component attribute breakpoint binder
 * This binder is used to pass attributes to an Riba Component (directly) that should only be set at certain breakpoints (viewport widths).
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
    identifier: string | null
  ) {
    super(view, el, type, name, keypath, formatters, identifier);
    this.defaultAttributeBinder = new ComponentAttributeBinder(
      view,
      el,
      `co-${this.attributeName}`,
      name,
      keypath,
      formatters,
      ComponentAttributeBinder.key
    );
  }
}
