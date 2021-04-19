import { RibaModule } from "@ribajs/core";
import * as helper from "./helper";
import * as binders from "./binders";
// import * as formatters from './formatters';
import * as services from "./services";
// import * as components from './components';

export const extrasModule: RibaModule = {
  helper,
  formatters: {},
  binders,
  services,
  components: {},
};
