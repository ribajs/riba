import { RibaModule } from "@ribajs/core";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as components from "./components/index.js";
import { OctobercmsModuleOptions } from "./types/index.js";

declare global {
  interface Window {
    // Allow any custom property in Window
    [key: string]: any;
  }
}

export const octobercmsModule: RibaModule<OctobercmsModuleOptions> = {
  formatters,
  binders,
  services,
  components,
  init(options = {}) {
    services.OctobercmsService.setSingleton(options);
    return this;
  }
};
