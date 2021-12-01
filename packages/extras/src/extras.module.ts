import { RibaModule } from "@ribajs/core";
import * as helper from "./helper";
import * as bindersDeprecated from "./binders-deprecated";
// import * as formatters from './formatters';
import * as services from "./services";
// import * as components from './components';
import { ExtrasModuleOptions } from "./types";

export const extrasModule: RibaModule<ExtrasModuleOptions> = {
  helper,
  formatters: {},
  bindersDeprecated,
  services,
  components: {},
  init(options = {}) {
    services.ExtrasService.setSingleton(options);
    return this;
  },
};
