import { RibaModule } from "@ribajs/core";
import * as components from "./components";

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
