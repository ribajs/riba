import { RibaModule } from "@ribajs/core";
// import * as binders from './binders';
// import * as formatters from './formatters';
import * as services from "./services";
// import * as components from './components';

const shopifyTDAModule = <RibaModule>{
  binders: {},
  services,
  formatters: {},
  components: {},
};

export { shopifyTDAModule };
