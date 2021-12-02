import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as components from "./components";
import * as services from "./services";
import { RouterModuleOptions } from "./types";

export const routerModule: RibaModule<Partial<RouterModuleOptions>> = {
  binders,
  components,
  services,
  formatters: {},
  init(options = {}) {
    services.RouterService.setSingleton(options);
    return this;
  },
};
