import { RibaModule } from "@ribajs/core";
import * as components from "./components/index.js";

export const I18nStaticModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  }
};

export default I18nStaticModule;
