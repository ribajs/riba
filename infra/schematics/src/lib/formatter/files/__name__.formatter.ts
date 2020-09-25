import { Formatter } from '@ribajs/core';

export const <%= classify(name) %>Formatter: Formatter = {
  name: '<%= camelize(name) %>',
  read(a: string, b: string) {
    return a + ' from <%= camelize(name) %> <strong>formatter</strong> ' + b;
  },
};
