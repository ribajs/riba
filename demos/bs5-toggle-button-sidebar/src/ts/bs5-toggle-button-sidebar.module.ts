import { RibaModule } from "@ribajs/core";
// import * as binders from "./binders/index.js";
import * as components from "./components/index.js";
// import * as formatters from "./formatters/index.js";

export const Bs5ToggleButtonSidebarModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  }
};

export default Bs5ToggleButtonSidebarModule;
