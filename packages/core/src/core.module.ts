import { RibaModule } from "./types/index.js";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as components from "./components/index.js";
import * as adapters from "./adapters";
import { CoreModuleOptions } from "./types/index.js";

export const coreModule: RibaModule<CoreModuleOptions> = {
  formatters,
  binders,
  services,
  components,
  adapters,
  init(options = {}) {
    services.CoreService.setSingleton(options);

    window.onerror = (msg, url, line, col, error) => {
      console.error(msg, url, line, col, error);
    };
    window.addEventListener("error", (event: Event) => {
      console.error(event);
    });

    return this;
  },
};
