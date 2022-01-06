import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { AccessibilityModuleOptions } from "./types";

export const accessibilityModule: RibaModule<AccessibilityModuleOptions> = {
  binders,
  services,
  formatters,
  components,
  init(options = {}) {
    services.GamepadService.setSingleton(options);
    return this;
  },
};
