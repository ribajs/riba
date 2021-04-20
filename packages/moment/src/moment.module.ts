import { RibaModule } from "@ribajs/core";
import * as components from "./components";
import * as formatters from "./formatters";
import * as services from "./services";
import { MomentModuleOptions } from "./types";

export const momentModule: RibaModule = {
  formatters,
  binders: {},
  services: {},
  components,
  init(options: MomentModuleOptions = {}) {
    services.MomentService.setSingleton(options);
    return this;
  },
};
