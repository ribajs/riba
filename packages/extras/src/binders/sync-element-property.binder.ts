import { Binder } from "@ribajs/core";
import { throttle } from "@ribajs/utils/src/control";

/**
 * Binds an event handler on the element.
 * either copy-element-width or copy-element-height
 */
export const syncElementPropertyBinder: Binder<string> = {
  name: "sync-element-*",
  function: true,
  priority: 1000,

  bind() {
    this.customData = {
      syncWidth: throttle(() => {
        this.el.style.width = this.customData.elToSync.clientWidth + "px";
      }),
      syncHeight: throttle(() => {
        this.el.style.height = this.customData.elToSync.clientHeight + "px";
      }),
    };
  },

  unbind(/*el: HTMLElement*/) {
    const propertyName = this.args[0] as string;
    if (this.customData.elToSync) {
      this.customData.elToSync.removeEventListener(
        "resize",
        propertyName === "width"
          ? this.customData.syncWidth
          : this.customData.syncHeight
      );
    }
  },

  routine(el: HTMLElement, value: string) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    const propertyName = this.args[0] as string;

    if (this.customData.elToSync) {
      this.customData.elToSync.removeEventListener(
        "resize",
        propertyName === "width"
          ? this.customData.syncWidth
          : this.customData.syncHeight
      );
    }
    const elementToSync = document.getElementById(value);
    if (elementToSync) {
      this.customData.elToSync = elementToSync;
      switch (propertyName) {
        case "height":
          el.style.height = elementToSync.clientHeight + "px";
          window.addEventListener("resize", this.customData.syncHeight);
          break;
        case "width":
          el.style.width = elementToSync.clientWidth + "px";
          window.addEventListener("resize", this.customData.syncWidth);
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
