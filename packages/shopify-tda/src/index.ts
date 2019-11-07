import { RibaModule } from '@ribajs/core';

// export * from './binders';
// export * from './interfaces';
export * from './services';

// import { binders } from './binders';
import * as services from './services';

export const shopifyTDAModule = <RibaModule> {
  // binders,
  services,
};

export default shopifyTDAModule;
