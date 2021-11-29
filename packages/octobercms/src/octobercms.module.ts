import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { OctobercmsModuleOptions } from "./types";

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
  },
};
