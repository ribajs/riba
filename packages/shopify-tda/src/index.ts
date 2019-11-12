import { RibaModule } from '@ribajs/core';

// export * from './binders';
// export * from './interfaces';
export * from './services';

// import { binders } from './binders';
import * as services from './services';
// import * as components from './components';

export const shopifyTDAModule = <RibaModule> {
  binders: {},
  services,
  formatters: {},
  components: {},
};

export default shopifyTDAModule;
