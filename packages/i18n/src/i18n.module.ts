import { RibaModule } from '@ribajs/core';
import { I18nModuleOptions } from './types';
import * as binders from './binders';
import * as formatters from './formatters';
import * as components from './components';
import * as services from './services';

export const i18nModule: RibaModule = {
  binders,
  components,
  formatters,
  services,
  init(options: I18nModuleOptions) {
    services.I18nService.setSingleton(options);
    return this;
  },
};
