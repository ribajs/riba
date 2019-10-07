import { IRibaModule } from '@ribajs/core';
import * as eachItemComponents from './components';

export const eachItemModule: IRibaModule = {
  formatters: {},
  binders: {},
  components: { ...eachItemComponents },
  services: {}
};