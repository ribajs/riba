import { RibaModule } from '@ribajs/core';
import * as binders from './binders';
import * as components from './components';
import * as formatters from './formatters';
import * as services from './services';

export const shopifyModule: RibaModule = {
  binders,
  formatters,
  services,
  components,
};

export default shopifyModule;
