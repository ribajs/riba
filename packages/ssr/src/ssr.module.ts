import { RibaModule } from "@ribajs/core";
import type { EventDispatcher } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
declare global {
  interface Window {
    ssrEvents: EventDispatcher;
  }
}

export const SSRModule = <RibaModule>{
  binders,
  services,
  formatters,
  components,
};
