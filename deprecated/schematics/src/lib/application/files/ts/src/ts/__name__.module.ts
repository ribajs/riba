import { RibaModule } from '@ribajs/core';
import * as binders from "./binders/index.js";
import * as components from './components';
import * as formatters from "./formatters/index.js";

export const <%= classify(name) %>Module: RibaModule = {
  binders,
  components,
  formatters,
  services: {},
  init() {
    return this;
  },
};

export default <%= classify(name) %>Module;
