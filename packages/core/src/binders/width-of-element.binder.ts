import { Binder } from "../interfaces";

/**
 * Binds an event handler on the element.
 */
export const widthOfElementBinder: Binder<string> = {
  name: "width-of-element",
  function: true,
  priority: 1000,

  bind() {
    if (!this.customData) {
      this.customData = {
        handler: null,
      };
    }
  },

  unbind(el: HTMLElement) {
    if (this.customData.handler) {
      if (this.args === null) {
        throw new Error("args is null");
      }
      const eventName = this.args[0] as string;
      el.removeEventListener(eventName, this.customData.handler);
    }
  },

  routine(el: HTMLElement, value: string) {
    if (this.args === null) {
      throw new Error("args is null");
    }

    if (this.customData.handler) {
      window.removeEventListener("resize", this.customData.handler);
    }

    el.addEventListener("resize", () => {
      el.style.width = document.getElementById(value)?.clientWidth;
    });
  },
};
