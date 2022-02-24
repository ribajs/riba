import type { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { TypedocModuleOptions } from "./types";

export const typedocModule: RibaModule<TypedocModuleOptions> = {
  binders,
  services,
  formatters,
  components,
  init(options = {}) {
    return this;
  },
};
