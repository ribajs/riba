import { AttributeBinder, View } from "@ribajs/core";
import { Bs5AbstractBreakpointBinder } from "./bs5-abstract-breakpoint.binder";

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
    identifier: string | null
  ) {
    super(view, el, type, name, keypath, formatters, identifier);
    this.defaultAttributeBinder = new AttributeBinder(
      view,
      el,
      this.attributeName,
      name,
      keypath,
      formatters,
      "*"
    );
  }
}
