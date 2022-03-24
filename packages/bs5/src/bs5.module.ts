import { RibaModule } from "@ribajs/core";
import { extend } from "@ribajs/utils/src/type.js";
import { Bs5ModuleOptions } from "./types/index.js";

import * as binders from "./binders/index.js";
import * as components from "./components/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as constants from "./constants/index.js";

export const bs5Module: RibaModule<Partial<Bs5ModuleOptions>> = {
  binders,
  services,
  formatters,
  components,
  constants,
  init(partialOptions = {}) {
    const options = extend(
      { deep: true, keepValues: true },
      partialOptions,
      constants.DEFAULT_MODULE_OPTIONS
    ) as Bs5ModuleOptions;
    services.Bs5Service.setSingleton(options);
    return this;
  },
};
