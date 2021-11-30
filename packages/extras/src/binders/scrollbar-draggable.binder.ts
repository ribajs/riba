import { BinderDeprecated } from "@ribajs/core";
import { Dragscroll, DragscrollOptions } from "../services/dragscroll.service";

/**
 * dragscroll
 */
export const scrollbarDraggableBinder: BinderDeprecated<DragscrollOptions> = {
  name: "scrollbar-draggable",
  routine(el: HTMLElement, options: DragscrollOptions) {
    this.customData = this.customData || {};
    if (this.customData.dragscroll) {
      (this.customData.dragscroll as Dragscroll).destroy();
    }
    this.customData.dragscroll = new Dragscroll(el, options);
  },
  unbind() {
    if (this.customData.dragscroll) {
      (this.customData.dragscroll as Dragscroll).destroy();
    }
  },
};
