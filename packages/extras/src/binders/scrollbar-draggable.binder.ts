import { Binder } from "@ribajs/core/src/index.js";
import {
  Dragscroll,
  DragscrollOptions
} from "../services/dragscroll.service.js";

/**
 * dragscroll
 */
export class ScrollbarDraggableBinder extends Binder<
  DragscrollOptions,
  HTMLElement
> {
  static key = "scrollbar-draggable";

  private dragscroll?: Dragscroll;

  routine(el: HTMLElement, options: DragscrollOptions) {
    if (this.dragscroll) {
      (this.dragscroll as Dragscroll).destroy();
    }
    this.dragscroll = new Dragscroll(el, options);
  }

  unbind() {
    if (this.dragscroll) {
      (this.dragscroll as Dragscroll).destroy();
    }
  }
}
