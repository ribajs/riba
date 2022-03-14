import { RibaModule } from "@ribajs/core/src/index.js";
import * as components from "./components/index.js";

export const Bs4TabsTplModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  },
};
