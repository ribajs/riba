import { RibaModule } from "@ribajs/core";
import * as components from "./components";

export const Bs4TabsAttrModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  },
};
