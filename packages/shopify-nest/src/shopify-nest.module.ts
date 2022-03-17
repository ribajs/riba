import { RibaModule } from "@ribajs/core";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as components from "./components/index.js";
import { ShopifyNestModuleOptions } from "./types/index.js";

export const shopifyNestModule: RibaModule<ShopifyNestModuleOptions> = {
  binders,
  services,
  formatters,
  components,
  init(options = {}) {
    services.ModuleService.setSingleton(options);
    return this;
  }
};
