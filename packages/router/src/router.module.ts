import { RibaModule } from "@ribajs/core";
import * as binders from "./binders/index.js";
import * as components from "./components/index.js";
import * as services from "./services/index.js";
import { RouterModuleOptions } from "./types/index.js";

export const routerModule = {
  binders,
  components,
  services,
  formatters: {},
  hooks: services.routerHooks,
  init(options = {}) {
    services.RouterService.setSingleton(options);
    return this;
  },
} as RibaModule<Partial<RouterModuleOptions>> & {
  hooks: typeof services.routerHooks;
};
