import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { ContentSliderModuleOptions } from "./types";

export const contentSliderModule: RibaModule = {
  formatters,
  binders,
  services,
  components,
  init(options: ContentSliderModuleOptions = {}) {
    services.ContentSliderService.setSingleton(options);
    return this;
  },
};
