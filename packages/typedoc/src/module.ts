import type { RibaModule } from "@ribajs/core/src/index.js";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as components from "./components/index.js";
import { TypedocModuleOptions } from "./types/index.js";

export const typedocModule: RibaModule<TypedocModuleOptions> = {
  binders,
  services,
  formatters,
  components,
  init(options = {}) {
    return this;
  },
};
