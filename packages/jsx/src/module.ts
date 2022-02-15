import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { JSXModuleOptions } from "./types";

export const jsxModule: RibaModule<JSXModuleOptions> = {
  binders,
  services,
  formatters,
  components,
  init(options = {}) {
    return this;
  },
};
