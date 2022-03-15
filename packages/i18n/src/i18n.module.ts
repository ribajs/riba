import { RibaModule } from "@ribajs/core/src/index.js";
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
    if (!options) {
      throw new Error("[i18nModule] Module options required!");
    }
    services.I18nService.setSingleton(options);
    return this;
  }
};
