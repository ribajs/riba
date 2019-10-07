import { IRibaModule } from '@ribajs/core';

export * from './services';
export * from './interfaces';

import * as binders from './binders';
import * as components from './components';
import * as formatters from './formatters';
import * as services from './services';

export const shopifyModule = <IRibaModule> {
  binders,
  formatters,
  services,
  components,
};

export default shopifyModule;
