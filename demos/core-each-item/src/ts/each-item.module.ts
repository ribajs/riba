import { RibaModule } from "@ribajs/core/src/index.js";
import * as eachItemComponents from "./components/index.js";

export const eachItemModule: RibaModule = {
  formatters: {},
  binders: {},
  components: { ...eachItemComponents },
  services: {},
  init() {
    return this;
  }
};
