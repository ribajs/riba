import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { LeafletModuleOptions } from "./types";

export const leafletModule: RibaModule = {
  formatters,
  binders,
  services,
  components,
  init(options: LeafletModuleOptions = {}) {
    services.LeafletService.setSingleton(options);
    return this;
  },
};
