import { Binder } from "../types";

/**
 * not-draggable
 * Useful to prevent dragging of ghost image
 */
export const notDraggableBinder: Binder<boolean> = {
  name: "not-draggable",

  bind() {
    this.customData = {};
  },

  routine(el: HTMLElement) {
    el.addEventListener("dragstart", (event) => {
      event.preventDefault();
      return false;
    });
  },
};
