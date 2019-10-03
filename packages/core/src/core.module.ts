import { IRibaModule } from './interfaces';
import * as binders from './binders';
import * as formatters from './formatters';
import * as services from './services';

export const coreModule: IRibaModule = {
  formatters,
  binders,
  services,
};
