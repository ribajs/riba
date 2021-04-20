import { RibaModule } from "@ribajs/core";
import * as eachItemComponents from "./components";

export const eachItemModule: RibaModule = {
  formatters: {},
  binders: {},
  components: { ...eachItemComponents },
  services: {},
  init() {
    return this;
  },
};
