import { IFormatter } from '@ribajs/core';

export const <%= classify(name) %>Formatter: IFormatter = {
  name: '<%= name %>',
  read(a: string, b: string) {
    return a + ' from <%= name %> <strong>formatter</strong> ' + b;
  },
};
