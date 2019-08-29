import { IRibaModule } from '@ribajs/core';

export * from './binders';
export * from './components';
export * from './formatters';
export * from './interfaces';
export * from './services';

import bindersWrapper from './binders';
import formattersWrapper from './formatters';
import * as services from './services';

export const i18nModule = (localesService: services.ALocalesService): IRibaModule => {
  return {
    binders: bindersWrapper(localesService),
    components: {},
    formatters: formattersWrapper(localesService),
    services,
  };
};

export default i18nModule;
