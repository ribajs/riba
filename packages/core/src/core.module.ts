import { RibaModule } from './interfaces';
import * as binders from './binders';
import * as formatters from './formatters';
import * as services from './services';
import * as components from './components';

export const coreModule: RibaModule = {
  formatters,
  binders,
  services,
  components,
};
