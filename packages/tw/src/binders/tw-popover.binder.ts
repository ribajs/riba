import { Binder } from "@ribajs/core";
import { PopoverService } from "../services/popover.service.js";
import type { Placement } from "@floating-ui/dom";

export interface TwPopoverOptions {
  placement?: Placement;
  arrow?: boolean;
  popoverSelector?: string;
}

/**
 * Initializes a popover on an element using Floating UI for positioning.
 *
 * Methods "show", "hide", "toggle", "dispose" can be called by dispatching
 * a `trigger-${methodName}` event on the bound element.
 */
export class PopoverBinder extends Binder<
  string | TwPopoverOptions,
  HTMLElement
> {
  static key = "tw-popover";

  private popoverService?: PopoverService;
  private listeners: { [key: string]: EventListener } = {};

  routine(el: HTMLElement, optionsOrSelector: string | TwPopoverOptions) {
    let options: TwPopoverOptions = {};

    if (typeof optionsOrSelector === "string") {
      options.popoverSelector = optionsOrSelector;
    } else if (typeof optionsOrSelector === "object") {
      options = { ...optionsOrSelector };
    }

    const popoverSelector = options.popoverSelector || "[data-tw-popover]";
    const popoverEl = el.querySelector<HTMLElement>(popoverSelector);

    if (!popoverEl) {
      console.warn(
        `[tw-popover] No popover element found with selector "${popoverSelector}"`,
      );
      return;
    }

    // Destroy previous popover if it already exists
    if (this.popoverService) {
      this.popoverService.dispose();
    }

    const popoverService = new PopoverService(el, popoverEl, {
      placement: options.placement,
      arrow: options.arrow,
    });

    this.popoverService = popoverService;

    /*
     * Methods "show", "hide", etc. can be called by dispatching an
     * event `trigger-${methodName}` on the bound element.
     */
    const methodNames: (keyof PopoverService)[] = [
      "show",
      "hide",
      "toggle",
      "dispose",
    ];

    // Remove listeners of previous popover if there already was one
    if (this.listeners) {
      for (const [trigger, listener] of Object.entries(this.listeners)) {
        this.el.removeEventListener(trigger, listener as EventListener);
      }
    }

    this.listeners = Object.create(null);
    for (const methodName of methodNames) {
      if (
        popoverService[methodName] &&
        typeof popoverService[methodName] === "function"
      ) {
        const trigger = `trigger-${String(methodName)}`;
        const listener = (popoverService[methodName] as any).bind(
          popoverService,
        );
        this.el.addEventListener(trigger, listener);
        this.listeners[trigger] = listener;
      }
    }
  }

  bind(el: HTMLElement) {
    // Inform ancestors that this popover was bound
    el.dispatchEvent(
      new CustomEvent("bound.tw.popover", { bubbles: true, cancelable: true }),
    );
  }

  unbind() {
    // Destroy popover if it already exists
    if (this.popoverService) {
      this.popoverService.dispose();
    }
    // Remove listeners if there are any
    if (this.listeners) {
      for (const [trigger, listener] of Object.entries(this.listeners)) {
        this.el.removeEventListener(trigger, listener as EventListener);
      }
    }
  }
}
