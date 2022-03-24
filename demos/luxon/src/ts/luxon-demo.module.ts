import { RibaModule } from "@ribajs/core";
// import * as binders from "./binders/index.js";
import * as components from "./components/index.js";
// import * as formatters from "./formatters/index.js";

export const LuxonDemoModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  },
};

export default LuxonDemoModule;
