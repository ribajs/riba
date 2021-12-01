import { RibaModule } from "@ribajs/core";
import { I18nModuleOptions } from "./types";
import * as bindersDeprecated from "./binders-deprecated";
import * as formatters from "./formatters";
import * as components from "./components";
import * as services from "./services";

export const i18nModule: RibaModule<I18nModuleOptions> = {
  bindersDeprecated,
  components,
  formatters,
  services,
  init(options) {
    if (!options) {
      throw new Error("[i18nModule] Module options required!");
    }
    services.I18nService.setSingleton(options);
    return this;
  },
};
