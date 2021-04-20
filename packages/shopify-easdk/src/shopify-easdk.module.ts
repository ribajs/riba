import { RibaModule } from "@ribajs/core";
import * as components from "./components";
// import * as formatters from './formatters;
// import * as binders from './binders';
import * as services from "./services";
import { ShopifyEasdkModuleOptions } from "./types";

export const shopifyEasdkModule: RibaModule = {
  formatters: {},
  binders: {},
  services,
  components,
  init(options: ShopifyEasdkModuleOptions = {}) {
    services.ModuleService.setSingleton(options);
    return this;
  },
};
