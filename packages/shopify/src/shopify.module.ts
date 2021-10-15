import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as components from "./components";
import * as formatters from "./formatters";
import * as services from "./services";
import { ShopifyModuleOptions } from "./types";

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
