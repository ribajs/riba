import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { OctobercmsModuleOptions } from "./types";

export const octobercmsModule: RibaModule = {
  formatters,
  binders,
  services,
  components,
  init(options: OctobercmsModuleOptions = {}) {
    services.OctobercmsService.setSingleton(options);
    return this;
  },
};
