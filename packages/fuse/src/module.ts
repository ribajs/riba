import { RibaModule } from "@ribajs/core";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as components from "./components/index.js";
import { FuseModuleOptions } from "./types/index.js";

export const fuseModule: RibaModule<FuseModuleOptions> = {
  binders,
  services,
  formatters,
  components,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(options = {}) {
    return this;
  },
};
