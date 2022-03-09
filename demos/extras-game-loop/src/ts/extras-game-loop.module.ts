import { RibaModule } from "@ribajs/core/src/index.js";
import * as components from "./components/index.js";

export const ExtrasGameLoopModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  },
};

export default ExtrasGameLoopModule;
