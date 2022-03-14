import { RibaModule } from "@ribajs/core/src/index.js";
import * as binders from "./binders/index.js";
import * as components from "./components/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import { ShopifyModuleOptions } from "./types/index.js";

export const shopifyModule: RibaModule<ShopifyModuleOptions> = {
  binders,
  formatters,
  services,
  components,
  init(options = {}) {
    services.ModuleService.setSingleton(options);
    return this;
  },
};
