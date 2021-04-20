import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { ShopifyTDAModuleOptions } from "./types";

export const shopifyTDAModule = <RibaModule>{
  binders,
  services,
  formatters,
  components,
  init(options: ShopifyTDAModuleOptions = {}) {
    services.ModuleService.setSingleton(options);
    return this;
  },
};
