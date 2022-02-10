import { Binder } from "../binder";

/**
 * Sets a reference to the HTML element into the scope
 */
export class ElementBinder extends Binder<HTMLElement, HTMLElement> {
  static key = "element";
  publishes = true;

  bind(el: HTMLInputElement) {
    this.publish();
  }

  routine(el: HTMLElement, modelEl: HTMLElement) {
    //
  }

  getValue(el: HTMLElement) {
    return el;
  }
}
