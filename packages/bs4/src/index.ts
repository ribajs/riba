
import { IRibaModule } from '@ribajs/core';
export * from './services';

// import * from './interfaces/interfaces';
import * as binders from './binders';
import * as components from './components';
// import * as formatters from './formatters/bs4.formatters';
import * as services from './services';
export const bs4Module: IRibaModule = {
  binders,
  services,
  // formatters,
  components,
};

export default bs4Module;
