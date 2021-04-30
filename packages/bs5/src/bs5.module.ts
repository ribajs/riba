import { RibaModule } from "@ribajs/core";
import { extend } from "@ribajs/utils/src/type";
import { Bs5ModuleOptions } from "./types";

import * as binders from "./binders";
import * as components from "./components";
import * as formatters from "./formatters";
import * as services from "./services";
import * as constants from "./constants";

export const bs5Module: RibaModule = {
  binders,
  services,
  formatters,
  components,
  constants,
  init(partialOptions: Partial<Bs5ModuleOptions> = {}) {
    const options = extend(
      { deep: true },
      partialOptions,
      constants.DEFAULT_MODULE_OPTIONS
    ) as Bs5ModuleOptions;
    services.Bs5Service.setSingleton(options);
    return this;
  },
};
