import { IfBinder } from "./if.binder";

/**
 * unless
 * Removes and unbinds the element and it's child nodes into the DOM when true
 * (negated version of `if` binder).
 */
export class UnlessBinder extends IfBinder {
  static key = "unless";

  routine(el: HTMLElement, value: boolean) {
    return super.routine(el, !value);
  }
}
