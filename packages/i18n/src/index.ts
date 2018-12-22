import { IRibaModule } from '@ribajs/core';

export * from './binders';
export * from './components';
export * from './formatters';
export * from './interfaces';
export * from 'services';

import bindersWrapper from './binders';
import componentsWrapper from './components';
import formattersWrapper from './formatters';
import * as services from './services';

export default (localesService: services.ALocalesService): IRibaModule => {
  return {
    binders: bindersWrapper(localesService),
    components: componentsWrapper(localesService),
    formatters: formattersWrapper(localesService),
    services,
  };
};
