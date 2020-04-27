import { RibaModule } from '@ribajs/core';
import * as routerBinders from './binders';
import * as services from './services';

export const routerModule = {
  binders: routerBinders,
  services,
} as RibaModule;
export default coreModule;
