import { IRibaModule } from '@ribajs/core';

export * from './binders';
export * from './interfaces';
export * from './services';

import * as routerBinders from './binders';
import * as services from './services';

export const routerModule = <IRibaModule> {
  binders: routerBinders,
  services,
};

export default routerModule;
