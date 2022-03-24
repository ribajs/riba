import { RibaModule } from "@ribajs/core";
import * as binders from "./binders/index.js";
// import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
// import * as components from './components';
import { JQueryModuleOptions } from "./types/index.js";

export const jqueryModule: RibaModule<JQueryModuleOptions> = {
  formatters: {},
  binders,
  services,
  components: {},
  init(options = {}) {
    services.JQueryService.setSingleton(options);
    return this;
  },
};
