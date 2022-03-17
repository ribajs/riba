import { RibaModule } from "@ribajs/core";
import * as components from "./components/index.js";
// import * as formatters from './formatters;
// import * as binders from "./binders/index.js";
import * as services from "./services/index.js";
import { ShopifyEasdkModuleOptions } from "./types/index.js";

export const shopifyEasdkModule: RibaModule<ShopifyEasdkModuleOptions> = {
  formatters: {},
  binders: {},
  services,
  components,
  init(options = {}) {
    services.ModuleService.setSingleton(options);
    return this;
  }
};
