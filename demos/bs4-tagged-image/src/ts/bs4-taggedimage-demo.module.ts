import { RibaModule } from "@ribajs/core/src/index.js";
// import * as binders from "./binders/index.js";
import * as components from "./components/index.js";
// import * as formatters from "./formatters/index.js";

export const Bs4TaggedImageDemoModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  }
};

export default Bs4TaggedImageDemoModule;
