import { RibaModule } from '@ribajs/core';
import * as routerBinders from './binders';
import * as services from './services';

export const routerModule = <RibaModule> {
  binders: routerBinders,
  services,
};
export default routerModule;
