import { RibaModule } from "@ribajs/core";
import * as components from "./components";

export const componentsModule: RibaModule = {
  formatters: {},
  binders: {},
  components,
  services: {},
  init() {
    return this;
  },
};
