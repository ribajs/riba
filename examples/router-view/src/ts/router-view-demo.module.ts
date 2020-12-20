import { RibaModule } from "@ribajs/core";
// import * as binders from './binders';
import * as pageComponents from "./pages";
import * as components from "./components";
// import * as formatters from './formatters';

export const RouterViewDemoModule: RibaModule = {
  binders: {},
  components: {
    ...pageComponents,
    ...components,
  },
  formatters: {},
  services: {},
};

export default RouterViewDemoModule;
