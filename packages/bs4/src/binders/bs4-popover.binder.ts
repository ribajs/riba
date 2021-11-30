import { PopoverService, PopoverOptions } from "@ribajs/bs4";

/**
 *
 */
import { BinderDeprecated } from "@ribajs/core";

/**
 *
 */
export const popoverBinder: BinderDeprecated<string> = {
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

    const popover = new PopoverService(el, {
      ...PopoverService.Default,
      ...options,
    });

    // destroy previous popover if it already exists
    if (this.customData.popover) {
      this.customData.popover.dispose();
    }

    this.customData.popover = popover;

    /*
     * Methods "show", "hide", etc. of the PopoverService can be called by dispatching an
     * event `trigger-${methodName}` on the bound element.
     * All these methods have no arguments.
     */
    const methodNames: (keyof typeof popover)[] = [
      "show",
      "hide",
      "toggle",
      "dispose",
      "enable",
      "disable",
      "toggleEnabled",
      "update", // render update
    ];

    // remove listeners of previous Popover if there already was one
    if (this.customData.listeners) {
      for (const [trigger, listener] of Object.entries(
        this.customData.listeners as [string, EventListener]
      )) {
        this.el.removeEventListener(trigger, listener as EventListener);
      }
    }

    this.customData.listeners = Object.create(null);
    for (const methodName of methodNames) {
      const trigger = `trigger-${methodName}`;
      const listener = (popover[methodName] as any).bind(popover);
      this.el.addEventListener(trigger, listener);
      this.customData.listeners[trigger] = listener;
    }
  },

  bind(el: HTMLElement) {
    // inform ancestors that this popover was bound
    // Event name in same style as the other popover CustomEvents from Bootstrap
    el.dispatchEvent(
      new CustomEvent("bound.bs.popover", { bubbles: true, cancelable: true })
    );
  },

  unbind() {
    // destroy Popover if it already exists
    if (this.customData.popover) {
      this.customData.popover.dispose();
    }
    // remove listeners if there are any
    if (this.customData.listeners) {
      for (const [trigger, listener] of Object.entries(
        this.customData.listeners as [string, EventListener]
      )) {
        this.el.removeEventListener(trigger, listener as EventListener);
      }
    }
  },
};
