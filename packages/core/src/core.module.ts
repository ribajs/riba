import { RibaModule } from "./types";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import * as adapters from "./adapters";
import { CoreModuleOptions } from "./types";

export const coreModule: RibaModule<CoreModuleOptions> = {
  formatters,
  binders,
  services,
  components,
  adapters,
  init(options = {}) {
    services.CoreService.setSingleton(options);
    return this;
  },
};
