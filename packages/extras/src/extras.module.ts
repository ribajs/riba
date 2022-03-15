import { RibaModule } from "@ribajs/core/src/index.js";
import * as helper from "./helper";
import * as binders from "./binders/index.js";
// import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
// import * as components from './components';
import { ExtrasModuleOptions } from "./types/index.js";

export const extrasModule: RibaModule<ExtrasModuleOptions> = {
  helper,
  formatters: {},
  binders,
  services,
  components: {},
  init(options = {}) {
    services.ExtrasService.setSingleton(options);
    return this;
  }
};
