import { RibaModule } from "@ribajs/core";
import * as components from "./components/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import { MomentModuleOptions } from "./types/index.js";

export const momentModule: RibaModule<MomentModuleOptions> = {
  formatters,
  binders: {},
  services: {},
  components,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(options = {}) {
    services.MomentService.setSingleton(options);
    return this;
  },
};
