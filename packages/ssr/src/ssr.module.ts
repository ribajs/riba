import "./types/global";

import { RibaModule, LifecycleService } from "@ribajs/core";
import * as binders from "./binders";
import * as formatters from "./formatters";
import * as services from "./services";
import * as components from "./components";
import { SSRModuleOptions } from "./types";

export const SSRModule: RibaModule<SSRModuleOptions> = {
  binders,
  services,
  formatters,
  components,
  init(options = {}) {
    services.ModuleService.setSingleton(options);

    const lifecycle = LifecycleService.getInstance();

    // After all components are bound wie trigger the ssr ready event,
    // as soon as this event is triggered the ssr rendering will be done and returns the rendered html
    lifecycle.events.on("ComponentLifecycle:allBound", () => {
      window.ssr.events?.trigger("ready");
    });

    lifecycle.events.on("ComponentLifecycle:error", (error: Error) => {
      window.ssr.events?.trigger("error", error);
    });

    lifecycle.events.on("ComponentLifecycle:noComponents", (_error: Error) => {
      window.ssr.events?.trigger("error", new Error("[SSRModule] No component to render found!"));
    });

    return this;
  },
};
