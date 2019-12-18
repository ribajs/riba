import { Binder } from '@ribajs/core';
import { TouchEventService } from '../services/touch-events.service';

export const touchEventsBinder: Binder<string> = {
  name: 'touch-events',
  bind(el) {
    if (!this.customData) {
      this.customData = {};
    }
    this.customData.touchEventService = new TouchEventService(el);

    el.addEventListener('tapstart' as any, (event: CustomEvent) => {
      console.debug('tapstart detail', event.detail);
    });

    el.addEventListener('taphold' as any, (event: CustomEvent) => {
      console.debug('taphold detail', event.detail);
    });

    el.addEventListener('doubletap' as any, (event: CustomEvent) => {
      console.debug('doubletap detail', event.detail);
    });

    el.addEventListener('swipe' as any, (event: CustomEvent) => {
      console.debug('swipe detail', event.detail);
    });

    el.addEventListener('touchstart' as any, (event: CustomEvent) => {
      console.debug('touchstart', event);
    });

    el.addEventListener('touchmove' as any, (event: CustomEvent) => {
      console.debug('touchmove', event);
    });
  },
  unbind(el: HTMLElement) {
    if (this.customData.touchEventService) {
      (this.customData.touchEventService as TouchEventService).removeEventListeners();
    }
  },
  routine(el: HTMLUnknownElement, value: string) {
   // nothing
  },
};
