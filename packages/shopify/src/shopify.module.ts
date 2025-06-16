import { RibaModule } from "@ribajs/core";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import { ModuleService } from "./services/index.js";
import { ShopifyModuleOptions } from "./types/index.js";

export const shopifyModule: RibaModule<ShopifyModuleOptions> = {
  binders,
  formatters,
  services: {},
  components: {},

  init(options = {}) {
    ModuleService.setSingleton(options);
    return this;
  },
};
