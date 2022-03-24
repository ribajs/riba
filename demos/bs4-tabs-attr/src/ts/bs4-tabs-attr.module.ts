import { RibaModule } from "@ribajs/core";
import * as components from "./components/index.js";

export const Bs4TabsAttrModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  },
};
