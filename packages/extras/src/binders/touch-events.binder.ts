import { Binder } from '@ribajs/core';
import { TouchEventService } from '../services/touch-events.service';

export const touchEventsBinder: Binder<string> = {
  name: 'touch-events',
  bind(el) {
    console.debug('init touch-events');
    if (!this.customData) {
      this.customData = {};
    }
    if (this.el.dataset.touchEvents) {
      this.customData.touchEventService = TouchEventService.getInstance(Number(this.el.dataset.touchEvents));
    } else {
      this.customData.touchEventService = new TouchEventService(el);
    }
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
