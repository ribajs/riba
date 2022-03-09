import { RibaModule } from "@ribajs/core/src/index.js";
import * as binders from "./binders/index.js";
import * as components from "./components/index.js";
import * as services from "./services/index.js";
import { RouterModuleOptions } from "./types/index.js";

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
