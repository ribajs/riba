import { RibaModule } from "@ribajs/core";
import * as bindersDeprecated from "./binders-deprecated";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";

export const masonryModule: RibaModule = {
  bindersDeprecated,
  services,
  formatters,
  components,
  init(options = {}) {
    return this;
  },
};
