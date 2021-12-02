import { Binder } from "../binder";

/**
 * Enables the element when value is true.
 */
export class EnabledBinder extends Binder<
  boolean,
  HTMLButtonElement | HTMLInputElement
> {
  static key = "enabled";
  routine(el: HTMLButtonElement | HTMLInputElement, value: boolean) {
    el.disabled = !value;
  }
}
