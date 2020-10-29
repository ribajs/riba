import { RibaModule } from "@ribajs/core";
import * as vueComponents from "./components";

export const vueExampleModule: RibaModule = {
  formatters: {},
  binders: {},
  components: { ...vueComponents },
  services: {},
};
