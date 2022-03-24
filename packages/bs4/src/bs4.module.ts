import { RibaModule } from "@ribajs/core";
import * as binders from "./binders/index.js";
import * as components from "./components/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as helper from "./helper/index.js";
import * as constants from "./constants/index.js";
import { Bs4ModuleOptions } from "./interfaces/index.js";

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
  },
};
