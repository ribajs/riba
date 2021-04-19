import { RibaModuleCreator, RibaModule } from "@ribajs/core";
import { concat } from "@ribajs/utils/src/type";
import { Bs5ModuleOptions } from "./types";
import binders from "./binders";
import components from "./components";
import formatters from "./formatters";
import services from "./services";
import * as constants from "./constants";

export const bs5Module: RibaModuleCreator = (
  partialOptions: Partial<Bs5ModuleOptions> = {}
) => {
  const options = concat(
    true,
    partialOptions,
    constants.DEFAULT_MODULE_OPTIONS
  ) as Bs5ModuleOptions;

  return {
    binders: binders(options),
    services: services(options),
    formatters: formatters(options),
    components: components(options),
    constants,
  } as RibaModule;
};
