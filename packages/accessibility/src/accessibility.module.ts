import { RibaModule } from "@ribajs/core";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as components from "./components/index.js";
import { AccessibilityModuleOptions } from "./types/index.js";

export const accessibilityModule: RibaModule<AccessibilityModuleOptions> = {
  binders,
  services,
  formatters,
  components,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(options = {}) {
    services.GamepadService.setSingleton(options);
    services.KeyboardService.setSingleton(options);
    return this;
  },
};
