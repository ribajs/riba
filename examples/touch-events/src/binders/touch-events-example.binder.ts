import { Binder } from '@ribajs/core';

export const TouchEventsExampleBinder: Binder<string> = {
  name: 'touch-events-example',
  routine(el: HTMLUnknownElement, value: string) {
    el.innerHTML = (value ? value : '') + ' from touch-events-example <strong>binder</strong>!';
  },
};
