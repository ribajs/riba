import { IBinder } from '@ribajs/core';

export const <%= classify(name) %>Binder: IBinder<string> = {
  name: '<%= name %>',
  routine(el: HTMLUnknownElement, value: string) {
    el.innerHTML = (value ? value : '') + ' form <%= name %> <strong>binder</strong>!';
  },
};
