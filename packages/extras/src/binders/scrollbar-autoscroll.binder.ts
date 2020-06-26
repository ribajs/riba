import { Binder } from "@ribajs/core";
import { isString } from "@ribajs/utils/src/type";
import { Autoscroll, AutoscrollOptions } from "../services/autoscroll.service";

/**
 * Slideout click event to toggle the slideout
 */
export const autoscrollBinder: Binder<AutoscrollOptions> = {
  name: "autoscroll",
  routine(el: HTMLElement, options: AutoscrollOptions) {
    this.customData = this.customData || {};
    if (options && options.width && isString(options.width)) {
      if (options.width === "100vw") {
        el.style.width = options.width;
      } else {
        el.style.width = options.width;
      }
    }

    el.classList.add(`rv-autoscroll-${options.angle}`);

    setTimeout(() => {
      if (this.customData.autoscroll) {
        (this.customData.autoscroll as Autoscroll).destroy();
      }
      this.customData.autoscroll = new Autoscroll(el, options);
    }, 1000);
  },
  unbind() {
    if (this.customData.autoscroll) {
      (this.customData.autoscroll as Autoscroll).destroy();
    }
  },
};
