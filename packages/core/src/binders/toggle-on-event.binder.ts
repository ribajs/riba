import { Binder } from "../binder.js";

/**
 * Toggles a boolean variable to true/false if the event is triggered.
 */
export class ToggleOnEventBinder extends Binder<string, HTMLUnknownElement> {
  static key = "toggle-on-*";

  private propertyKey?: string;

  toggle() {
    if (this.propertyKey) {
      this.view.models[this.propertyKey] = !this.view.models[this.propertyKey];
    }
  }

  bind(el: HTMLUnknownElement) {
    const eventName = this.args[0] as string;
    const passive = this.el.dataset.passive === "true"; // data-passive="true"
    el.addEventListener(eventName, this.toggle, { passive });
  }

  unbind(el: HTMLUnknownElement) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    const eventName = this.args[0] as string;
    el.removeEventListener(eventName, this.toggle);
  }

  routine(el: HTMLUnknownElement, propertyKey: string) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    this.propertyKey = propertyKey;
  }
}
