import { RibaModule } from "@ribajs/core/src/index.js";
import * as binders from "./binders/index.js";
import * as components from "./components/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as helper from "./helper";
import * as constants from "./constants";
import { Bs4ModuleOptions } from "./interfaces";

export const bs4Module: RibaModule<Bs4ModuleOptions> = {
  binders,
  services,
  formatters,
  components,
  helper,
  constants,
  init(options: Bs4ModuleOptions = {}) {
    services.Bs4Service.setSingleton(options);
    return this;
  }
};
