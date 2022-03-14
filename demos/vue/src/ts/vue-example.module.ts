import { RibaModule } from "@ribajs/core/src/index.js";
import * as vueComponents from "./components/index.js";

export const vueExampleModule: RibaModule = {
  formatters: {},
  binders: {},
  components: { ...vueComponents },
  services: {},
  init() {
    return this;
  },
};
