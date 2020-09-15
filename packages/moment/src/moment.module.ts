import { RibaModule } from "@ribajs/core";
import * as components from "./components";
import * as formatters from "./formatters";

export const momentModule: RibaModule = {
  formatters,
  binders: {},
  services: {},
  components,
};
