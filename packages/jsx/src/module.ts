import { RibaModule } from "@ribajs/core/src/index.js";
import { JSXModuleOptions } from "./types/index.js";

export const jsxModule: RibaModule<JSXModuleOptions> = {
  init(options = {}) {
    return this;
  },
};
