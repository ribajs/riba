import { Formatter } from '@ribajs/core';

export const <%= classify(name) %>Formatter: Formatter = {
  name: '<%= name %>',
  read(a: string, b: string) {
    return a + ' from <%= name %> <strong>formatter</strong> ' + b;
  },
};
