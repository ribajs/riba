import { RibaModule } from "@ribajs/core";
import { JSXModuleOptions } from "./types/index.js";

export const jsxModule: RibaModule<JSXModuleOptions> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(options = {}) {
    return this;
  }
};
