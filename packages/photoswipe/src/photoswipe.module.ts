import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";

const photoswipeModule: RibaModule = {
  formatters,
  binders,
  services,
  components,
};

export { photoswipeModule };
