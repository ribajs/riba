import { Binder } from "@ribajs/core";
import { Popover, PopoverOptions } from "@ribajs/bs5";

/**
 *
 */
export class PopoverBinder extends Binder<string, HTMLElement> {
  static key = "bs5-popover";

  private popover?: Popover;
  private listeners: { [key: string]: EventListener } = {};

  routine(el: HTMLElement, optionsOrContent: string | PopoverOptions) {
    let options: Partial<PopoverOptions> = {};

    if (typeof optionsOrContent === "string") {
      options.content = optionsOrContent;
    } else if (typeof optionsOrContent === "object") {
      options = { ...optionsOrContent };
    }
    options.placement = options.placement || "auto";

    const popover = new Popover(el, {
      ...Popover.Default,
      ...options,
    });

    // destroy previous popover if it already exists
    if (this.popover) {
      this.popover.dispose();
    }

    this.popover = popover;

    /*
     * Methods "show", "hide", etc. of the Popover can be called by dispatching an
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
      "update", // render update
    ];

    // remove listeners of previous Popover if there already was one
    if (this.listeners) {
      for (const [trigger, listener] of Object.entries(this.listeners)) {
        this.el.removeEventListener(trigger, listener as EventListener);
      }
    }

    this.listeners = Object.create(null);
    for (const methodName of methodNames) {
      if (popover[methodName] && typeof popover[methodName] === "function") {
        const trigger = `trigger-${String(methodName)}`;
        const listener = (popover[methodName] as any).bind(popover);
        this.el.addEventListener(trigger, listener);
        this.listeners[trigger] = listener;
      } else {
        console.warn("Unknown method " + methodName);
      }
    }
  }

  bind(el: HTMLElement) {
    // inform ancestors that this popover was bound
    // Event name in same style as the other popover CustomEvents from Bootstrap
    el.dispatchEvent(
      new CustomEvent("bound.bs.popover", { bubbles: true, cancelable: true })
    );
  }

  unbind() {
    // destroy Popover if it already exists
    if (this.popover) {
      this.popover.dispose();
    }
    // remove listeners if there are any
    if (this.listeners) {
      for (const [trigger, listener] of Object.entries(this.listeners)) {
        this.el.removeEventListener(trigger, listener as EventListener);
      }
    }
  }
}
