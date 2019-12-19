import { Binder } from '@ribajs/core';
import { Dragscroll, Options } from '../services/dragscroll.service';

/**
 * dragscroll
 */
export const scrollbarDragableBinder: Binder<Options> = {
  name: 'scrollbar-dragable',
  routine(el: HTMLElement, options: Options) {
    this.customData = this.customData || {};
    if (this.customData.dragscroll) {
      (this.customData.dragscroll as Dragscroll).removeEventListeners();
    }
    this.customData.dragscroll = new Dragscroll(el, options);
  },
  unbind() {
    if (this.customData.dragscroll) {
      (this.customData.dragscroll as Dragscroll).removeEventListeners();
    }
  },
};
