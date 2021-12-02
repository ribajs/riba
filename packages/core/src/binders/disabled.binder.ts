import { Binder } from "../binder";

/**
 * Disables the element when value is true (negated version of `enabled` binder).
 */
export class DisabledBinder extends Binder<
  boolean,
  HTMLButtonElement | HTMLInputElement
> {
  static key = "disabled";
  routine(el: HTMLButtonElement | HTMLInputElement, value: boolean) {
    el.disabled = !!value;
  }
}
