import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { MasonryModuleOptions } from "./types";

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
