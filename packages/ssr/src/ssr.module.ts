import "./types/global.js";

import { RibaModule, LifecycleService } from "@ribajs/core";
import * as binders from "./binders/index.js";
import * as formatters from "./formatters/index.js";
import * as services from "./services/index.js";
import * as components from "./components/index.js";
import { SSRModuleOptions } from "./types/index.js";

export const SSRModule: RibaModule<SSRModuleOptions> = {
  binders,
  services,
  formatters,
  components,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(options = {}) {
    services.ModuleService.setSingleton(options);

    const lifecycle = LifecycleService.getInstance();

    // After all components are bound we trigger the ssr ready event,
    // as soon as this event is triggered the ssr rendering will be done and returns the rendered html
    lifecycle.events.on("ComponentLifecycle:allBound", () => {
      window.ssr.events?.trigger("ready");
    });

    lifecycle.events.on("ComponentLifecycle:error", (error: Error) => {
      window.ssr.events?.trigger("error", error);
    });

    lifecycle.events.on("ComponentLifecycle:noComponents", () => {
      window.ssr.events?.trigger(
        "error",
        new Error("[SSRModule] No component to render found!")
      );
    });

    return this;
  },
};
