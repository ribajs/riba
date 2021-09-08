import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as components from "./components";
import * as services from "./services";
import { RouterModuleOptions } from "./types";

export const routerModule: RibaModule = {
  binders,
  components,
  services,
  formatters: {},
  init(options: Partial<RouterModuleOptions> = {}) {
    services.RouterService.setSingleton(options);
    return this;
  },
};
