import { IRibaModule } from '@ribajs/core';

export * from './services';
export * from './interfaces';

import * as components from './components';
import * as formatters from './formatters';
import * as services from './services';

export const shopifyModule = <IRibaModule> {
  formatters,
  services,
  components,
};

export default shopifyModule;
