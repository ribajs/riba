import { RibaModule } from "@ribajs/core/src/index.js";
import * as components from "./components/index.js";
import * as formatters from "./formatters/index.js";
import { LuxonModuleOptions } from "./types/index.js";

export const luxonModule: RibaModule<LuxonModuleOptions> = {
  formatters,
  binders: {},
  services: {},
  components,
  init(/* options: LuxonModuleOptions = {} */) {
    return this;
  },
};
