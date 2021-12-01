import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { ArtCodeStudioModuleOptions } from "./types";

export const artAndCodeStudioModule: RibaModule = {
  binders,
  services,
  formatters,
  components,
  init(options: ArtCodeStudioModuleOptions = {}) {
    services.ArtCodeStudioService.setSingleton(options);
    return this;
  },
};
