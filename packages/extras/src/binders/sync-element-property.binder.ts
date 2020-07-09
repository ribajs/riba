import { Binder } from "@ribajs/core";

/**
 * Binds an event handler on the element.
 * either copy-element-width or copy-element-height
 */
export const syncElementPropertyBinder: Binder<string> = {
  name: "sync-element-*",
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

    const propertyName = this.args[0] as string;
    const elementToSync = document.getElementById(value);
    if (elementToSync) {
      switch (propertyName) {
        case "height":
          el.style.height = elementToSync.clientHeight + "px";
          window.addEventListener("resize", () => {
            el.style.height = elementToSync.clientHeight + "px";
          });
          break;
        case "width":
          el.style.width = elementToSync.clientWidth + "px";
          window.addEventListener("resize", () => {
            el.style.width = elementToSync.clientWidth + "px";
          });
          break;
        default:
          console.warn(
            "[syncElementPropertyBinder] Unknown property: " + propertyName
          );
      }
    } else {
      console.warn(
        "[syncElementPropertyBinder] Could not find element with id: " + value
      );
    }
  },
};
