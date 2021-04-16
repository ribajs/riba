import { RibaModuleCreator, RibaModule } from "@ribajs/core";
import { I18nModuleOptions } from "./types";
import binders from "./binders";
import formatters from "./formatters";
import components from "./components";
import * as services from "./services";

export const i18nModule: RibaModuleCreator = (
  options: I18nModuleOptions
): RibaModule => {
  return {
    binders: binders(options),
    components: components(options),
    formatters: formatters(options),
    services,
  };
};
