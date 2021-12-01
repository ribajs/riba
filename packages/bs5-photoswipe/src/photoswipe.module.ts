import { RibaModule } from "@ribajs/core";
import * as bindersDeprecated from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { PhotoswipeModuleOptions } from "./types";

export const bs5PhotoswipeModule: RibaModule<PhotoswipeModuleOptions> = {
  formatters,
  bindersDeprecated,
  services,
  components,
  init(options = {}) {
    services.PhotoswipeService.setSingleton(options);
    return this;
  },
};
