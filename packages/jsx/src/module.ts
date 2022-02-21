import { RibaModule } from "@ribajs/core";
import { JSXModuleOptions } from "./types";

export const jsxModule: RibaModule<JSXModuleOptions> = {
  init(options = {}) {
    return this;
  },
};
