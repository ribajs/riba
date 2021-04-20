import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { ShopifyNestModuleOptions } from "./types";

export const shopifyNestModule = <RibaModule>{
  binders,
  services,
  formatters,
  components,
  init(options: ShopifyNestModuleOptions = {}) {
    services.ModuleService.setSingleton(options);
    return this;
  },
};
