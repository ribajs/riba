import { RibaModule } from "@ribajs/core";
import * as components from "./components";
import * as formatters from "./formatters";
import { LuxonModuleOptions } from "./types";

export const luxonModule: RibaModule<LuxonModuleOptions> = {
  formatters,
  binders: {},
  services: {},
  components,
  init(/* options: LuxonModuleOptions = {} */) {
    return this;
  },
};
