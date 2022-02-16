import { Binder } from "../binder";

/**
 * Sets a reference to the HTML element into the scope
 */
export class ElementBinder extends Binder<HTMLElement, HTMLElement> {
  static key = "element";
  publishes = true;

  bind() {
    this.publish();
  }

  routine() {
    //
  }

  getValue(el: HTMLElement) {
    return el;
  }
}
