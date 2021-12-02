import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
// import * as formatters from './formatters';
import * as services from "./services";
// import * as components from './components';
import { JQueryModuleOptions } from "./types";

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
