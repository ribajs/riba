import { RibaModule } from "@ribajs/core";
import { extend } from "@ribajs/utils/src/type";
import { Bs5ModuleOptions } from "./types";

import * as binders from "./binders";
import * as components from "./components";
import * as formatters from "./formatters";
import * as services from "./services";
import * as constants from "./constants";

export const bs5Module: RibaModule<Partial<Bs5ModuleOptions>> = {
  binders,
  services,
  formatters,
  components,
  constants,
  init(partialOptions = {}) {
    const options = extend(
      { deep: true },
      partialOptions,
      constants.DEFAULT_MODULE_OPTIONS
    ) as Bs5ModuleOptions;
    services.Bs5Service.setSingleton(options);
    return this;
  },
};
