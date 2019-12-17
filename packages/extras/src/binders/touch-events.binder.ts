import { Binder } from '@ribajs/core';
import { TouchEventService } from '../services/touch-events.service';

export const touchEventsBinder: Binder<string> = {
  name: 'touch-events',
  bind(el) {
    if (!this.customData) {
      this.customData = {};
    }
    this.customData.touchEventService = new TouchEventService(el);
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
