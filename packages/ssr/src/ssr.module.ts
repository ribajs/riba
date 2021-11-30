import "./types/global";

import { RibaModule } from "@ribajs/core";
import * as bindersDeprecated from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { SSRModuleOptions } from "./types";

export const SSRModule: RibaModule<SSRModuleOptions> = {
  bindersDeprecated,
  services,
  formatters,
  components,
  init(options = {}) {
    services.ModuleService.setSingleton(options);
    return this;
  },
};
