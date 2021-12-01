import { RibaModule } from "@ribajs/core";
import * as bindersDeprecated from "./binders-deprecated";
// import * as formatters from './formatters';
import * as services from "./services";
// import * as components from './components';
import { JQueryModuleOptions } from "./types";

export const jqueryModule: RibaModule<JQueryModuleOptions> = {
  formatters: {},
  bindersDeprecated,
  services,
  components: {},
  init(options = {}) {
    services.JQueryService.setSingleton(options);
    return this;
  },
};
