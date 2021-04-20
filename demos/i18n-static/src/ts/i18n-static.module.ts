import { RibaModule } from "@ribajs/core";
import * as components from "./components";

export const I18nStaticModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  },
};

export default I18nStaticModule;
