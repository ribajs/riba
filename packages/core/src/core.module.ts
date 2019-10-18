import { IRibaModule } from './interfaces';
import * as binders from './binders';
import * as formatters from './formatters';
import * as services from './services';
import * as components from './components';

export const coreModule: IRibaModule = {
  formatters,
  binders,
  services,
  components,
};
