import { RibaModuleCreator, RibaModule } from "@ribajs/core";
import { Bs5ModuleOptions } from "./types";
import binders from "./binders";
import components from "./components";
import formatters from "./formatters";
import * as services from "./services";

export const bs5Module: RibaModuleCreator = (
  options: Bs5ModuleOptions = {}
) => {
  return {
    binders: binders(options),
    services,
    formatters: formatters(options),
    components: components(options),
  } as RibaModule;
};
