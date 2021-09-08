import { RibaModule } from "@ribajs/core";
// import * as binders from './binders';
import * as components from "./components";
// import * as formatters from './formatters';

export const PodcastDemoModule: RibaModule = {
  binders: {},
  components,
  formatters: {},
  services: {},
  init() {
    return this;
  },
};

export default PodcastDemoModule;
