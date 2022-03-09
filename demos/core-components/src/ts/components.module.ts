import { RibaModule } from "@ribajs/core/src/index.js";
import * as components from "./components/index.js";

export const componentsModule: RibaModule = {
  formatters: {},
  binders: {},
  components,
  services: {},
  init() {
    return this;
  },
};
