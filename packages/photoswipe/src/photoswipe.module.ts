import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";

console.debug("components", components);

export const photoswipeModule: RibaModule = {
  formatters,
  binders,
  services,
  components,
};
