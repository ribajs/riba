import { Binder } from "@ribajs/core";
import { throttle } from "@ribajs/utils/src/control";

/**
 * Binds an event handler on the element.
 * either `sync-element-width` or `sync-element-height`
 */
export class SyncElementPropertyBinder extends Binder<string, HTMLElement> {
  static key = "sync-element-*";

  function = true;
  priority = 1000;

  private elToSync?: HTMLElement;

  private syncWidth = throttle(() => {
    this.el.style.width = (this.elToSync?.clientWidth || 0) + "px";
  });

  private syncHeight = throttle(() => {
    this.el.style.height = (this.elToSync?.clientHeight || 0) + "px";
  });

  unbind() {
    const propertyName = this.args[0] as string;
    if (this.elToSync) {
      this.elToSync.removeEventListener(
        "resize",
        propertyName === "width" ? this.syncWidth : this.syncHeight,
      );
    }
  }

  routine(el: HTMLElement, value: string) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    const propertyName = this.args[0] as string;

    if (this.elToSync) {
      this.elToSync.removeEventListener(
        "resize",
        propertyName === "width" ? this.syncWidth : this.syncHeight,
      );
    }
    const elementToSync = document.getElementById(value);
    if (elementToSync) {
      this.elToSync = elementToSync;
      switch (propertyName) {
        case "height":
          el.style.height = elementToSync.clientHeight + "px";
          window.addEventListener("resize", this.syncHeight);
          break;
        case "width":
          el.style.width = elementToSync.clientWidth + "px";
          window.addEventListener("resize", this.syncWidth);
          break;
        default:
          console.warn(
            "[syncElementPropertyBinder] Unknown property: " + propertyName,
          );
      }
    } else {
      console.warn(
        "[syncElementPropertyBinder] Could not find element with id: " + value,
      );
    }
  }
}
