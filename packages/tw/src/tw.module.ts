import { RibaModule } from "@ribajs/core";
import { extend } from "@ribajs/utils/src/type.js";
import { TwModuleOptions } from "./types/index.js";

import * as binders from "./binders/index.js";
import * as components from "./components/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as constants from "./constants/index.js";

export const twModule: RibaModule<Partial<TwModuleOptions>> = {
  binders,
  services,
  formatters,
  components,
  constants,
  init(partialOptions = {}) {
    const options = extend(
      { deep: true, keepValues: true },
      partialOptions,
      constants.DEFAULT_MODULE_OPTIONS,
    ) as TwModuleOptions;
    services.TwService.setSingleton(options);
    return this;
  },
};
