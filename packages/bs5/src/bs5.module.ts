import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as components from "./components";
// import * as formatters from './formatters/bs4.formatters';
import * as services from "./services";

export const bs5Module: RibaModule = {
  binders,
  services,
  formatters: {},
  components,
};
