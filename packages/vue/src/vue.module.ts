import { RibaModule } from "@ribajs/core";
// import * as binders from './binders';
// import * as formatters from './formatters';
// import * as services from "./services";
// import * as components from './components';
import { VueModuleOptions } from "./types";

export const vueModule = <RibaModule>{
  binders: {},
  services: {},
  formatters: {},
  components: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(options: VueModuleOptions = {}) {
    return this;
  },
};
