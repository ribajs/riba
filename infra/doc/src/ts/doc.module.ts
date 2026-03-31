import { RibaModule } from "@ribajs/core";
import * as components from "./components/index.js";

export const DocModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  },
};
