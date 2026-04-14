import { RibaModule } from "@ribajs/core";
import * as components from "./components/index.js";

export const DemoModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  },
};
