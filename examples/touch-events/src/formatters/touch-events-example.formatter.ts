import { Formatter } from '@ribajs/core';

export const TouchEventsExampleFormatter: Formatter = {
  name: 'touch-events-example',
  read(a: string, b: string) {
    return a + ' from touch-events-example <strong>formatter</strong> ' + b;
  },
};
