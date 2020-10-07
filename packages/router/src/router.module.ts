import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as components from "./components";
import * as services from "./services";

const routerModule = {
  binders,
  components,
  services,
  formatters: {},
} as RibaModule;

export { routerModule };
