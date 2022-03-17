import { RibaModule } from "@ribajs/core";
import * as components from "./components/index.js";

export const componentsModule: RibaModule = {
  formatters: {},
  binders: {},
  components,
  services: {},
  init() {
    return this;
  }
};
