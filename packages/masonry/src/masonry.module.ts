import { RibaModule } from "@ribajs/core/src/index.js";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as components from "./components/index.js";
import { MasonryModuleOptions } from "./types/index.js";

export const masonryModule: RibaModule = {
  binders,
  services,
  formatters,
  components,
  init(options: MasonryModuleOptions = {}) {
    services.MasonryService.setSingleton(options);
    return this;
  },
};
