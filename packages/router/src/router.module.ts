import { RibaModule } from "@ribajs/core";
import * as binders from "./binders";
import * as components from "./components";
import * as services from "./services";

export const routerModule = {
  binders,
  components,
  services,
} as RibaModule;
export default coreModule;
