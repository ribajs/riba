import { PopoverService } from "@ribajs/bs4";

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
  bind(el: HTMLUnknownElement) {
    console.debug("[popoverBinder] bind");
    const placement = (this.el.dataset.placement || "right") as
      | "auto"
      | "top"
      | "right"
      | "bottom"
      | "left";
    this.customData.popover = new PopoverService(el, {
      ...PopoverService.Default,
      placement,
      title: "test",
      content: "test",
    });
  },

  routine(el: HTMLElement, content: string) {
    (this.customData.popover as PopoverService).setContent(content);
  },

  // unbind() {},
};
