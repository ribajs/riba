import { RibaModule } from "@ribajs/core";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as components from "./components/index.js";
import { LeafletModuleOptions } from "./types/index.js";

export const leafletModule: RibaModule<LeafletModuleOptions> = {
  formatters,
  binders,
  services,
  components,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(options = {}) {
    services.LeafletService.setSingleton(options);
    return this;
  }
};
