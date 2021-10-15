import "./types/global";

import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { SSRModuleOptions } from "./types";

export const SSRModule: RibaModule<SSRModuleOptions> = {
  binders,
  services,
  formatters,
  components,
  init(options = {}) {
    services.ModuleService.setSingleton(options);
    return this;
  },
};
