import { Binder } from '@ribajs/core';
import { Dragscroll, DragscrollOptions } from '../services/dragscroll.service';

/**
 * dragscroll
 */
export const scrollbarDraggableBinder: Binder<DragscrollOptions> = {
  name: 'scrollbar-draggable',
  routine(el: HTMLElement, options: DragscrollOptions) {
    this.customData = this.customData || {};
    if (this.customData.dragscroll) {
      (this.customData.dragscroll as Dragscroll).destroy();
    }
    this.customData.dragscroll = new Dragscroll(el, options);
    console.debug('scrollbar-draggable', this);
  },
  unbind() {
    if (this.customData.dragscroll) {
      (this.customData.dragscroll as Dragscroll).destroy();
    }
  },
};
