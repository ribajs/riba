import { RibaModule } from "@ribajs/core/src/index.js";
import * as components from "./components/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import { MomentModuleOptions } from "./types/index.js";

export const momentModule: RibaModule<MomentModuleOptions> = {
  formatters,
  binders: {},
  services: {},
  components,
  init(options = {}) {
    services.MomentService.setSingleton(options);
    return this;
  },
};
