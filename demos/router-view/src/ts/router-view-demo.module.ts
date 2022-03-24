import { RibaModule } from "@ribajs/core";
// import * as binders from "./binders/index.js";
import * as pageComponents from "./pages";
import * as components from "./components/index.js";
// import * as formatters from "./formatters/index.js";

export const RouterViewDemoModule: RibaModule = {
  binders: {},
  components: {
    ...pageComponents,
    ...components,
  },
  formatters: {},
  services: {},
  init() {
    return this;
  },
};

export default RouterViewDemoModule;
