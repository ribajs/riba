import { RibaModule } from "@ribajs/core";
import { I18nModuleOptions } from "./types/index.js";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as components from "./components/index.js";
import * as services from "./services/index.js";

export const i18nModule: RibaModule<I18nModuleOptions> = {
  binders,
  components,
  formatters,
  services,
  init(options) {
    if (!options?.localesService) {
      throw new Error("[i18nModule] Module option localesService required!");
    }
    services.I18nService.setSingleton(options);
    // The service emits "error" itself, this keeps the rejection from going unhandled
    options.localesService.init().catch((error: unknown) => {
      console.error("[i18nModule] The locales service failed to start", error);
    });
    return this;
  },
};
