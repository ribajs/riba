export * from './binders';
// export * from './components';
// export * from './formatters';
// export * from './interfaces';
export * from './services';

import { RibaModule } from '@ribajs/core';
import * as binders from './binders';
// import * as formatters from './formatters';
import { TouchEventService } from './services';
// import * as components from './components';

export const extrasModule: RibaModule = {
  formatters: {},
  binders,
  services: { TouchEventService },
  components: {},
};
