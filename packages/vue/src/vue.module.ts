import { RibaModule } from "@ribajs/core";
// import * as binders from "./binders/index.js";
// import * as formatters from "./formatters/index.js";
// import * as services from "./services/index.js";
// import * as components from './components';
import { VueModuleOptions } from "./types/index.js";

export const vueModule: RibaModule<VueModuleOptions> = {
  binders: {},
  services: {},
  formatters: {},
  components: {},
  init(/*options = {}*/) {
    return this;
  }
};
