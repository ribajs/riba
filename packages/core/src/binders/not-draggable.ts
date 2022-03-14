import { Binder } from "../binder.js";

/**
 * not-draggable
 * Useful to prevent dragging of ghost image
 */
export class NotDraggableBinder extends Binder<boolean, HTMLElement> {
  static key = "not-draggable";

  routine(el: HTMLElement) {
    el.addEventListener("dragstart", (event) => {
      event.preventDefault();
      return false;
    });
  }
}
