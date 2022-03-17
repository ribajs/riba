import { RibaModule } from "@ribajs/core";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as components from "./components/index.js";
import { ContentSliderModuleOptions } from "./types/index.js";

export const contentSliderModule: RibaModule<ContentSliderModuleOptions> = {
  formatters,
  binders,
  services,
  components,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(options = {}) {
    services.ContentSliderService.setSingleton(options);
    return this;
  }
};
