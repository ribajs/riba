import { PopoverService, PopoverOptions } from "@ribajs/bs4";

/**
 *
 */
import { Binder } from "@ribajs/core";

/**
 *
 */
export const popoverBinder: Binder<string> = {
  name: "bs4-popover",
  block: false,
  routine(el: HTMLElement, optionsOrContent: string | PopoverOptions) {
    let options: Partial<PopoverOptions> = {};

    if (typeof optionsOrContent === "string") {
      options.content = optionsOrContent;
    } else if (typeof optionsOrContent === "object") {
      options = { ...optionsOrContent };
    }
    options.placement = options.placement || "auto";

    this.customData.popover = new PopoverService(el, {
      ...PopoverService.Default,
      ...options,
    });
  },

  // unbind() {},
};
