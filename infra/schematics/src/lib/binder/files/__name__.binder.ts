import { Binder } from '@ribajs/core';

export const <%= classify(name) %>Binder: BinderDeprecated<string> = {
  name: '<%= name %>',
  routine(el: HTMLUnknownElement, value: string) {
    el.innerHTML = (value ? value : '') + ' from <%= name %> <strong>binder</strong>!';
  },
};
