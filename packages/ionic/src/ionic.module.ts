import { RibaModule } from "@ribajs/core";
import { initialize } from "@ionic/core/components";

import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";

export const ionicModule: RibaModule = {
  binders,
  services,
  formatters,
  components,
  init(options = {}) {
    initialize();
    return this;
  },
};
