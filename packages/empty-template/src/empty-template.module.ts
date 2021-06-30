import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";

export const emptyTemplateModule: RibaModule = {
  binders,
  services,
  formatters,
  components,
  init(options = {}) {
    return this;
  },
};
