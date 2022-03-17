import { RibaModule } from "@ribajs/core";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as components from "./components/index.js";
import { ArtCodeStudioModuleOptions } from "./types/index.js";

export const artAndCodeStudioModule: RibaModule = {
  binders,
  services,
  formatters,
  components,
  init(options: ArtCodeStudioModuleOptions = {}) {
    services.ArtCodeStudioService.setSingleton(options);
    return this;
  }
};
