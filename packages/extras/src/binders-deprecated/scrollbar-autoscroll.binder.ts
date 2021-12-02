import { Binder } from "@ribajs/core";
import { isString } from "@ribajs/utils/src/type";
import { Autoscroll, AutoscrollOptions } from "../services/autoscroll.service";

/**
 * Slideout click event to toggle the slideout
 */
export class AutoscrollBinder extends Binder<AutoscrollOptions, HTMLElement> {
  static key = "autoscroll";

  autoscroll?: Autoscroll;

  routine(el: HTMLElement, options: AutoscrollOptions) {
    if (options && options.width && isString(options.width)) {
      if (options.width === "100vw") {
        el.style.width = options.width;
      } else {
        el.style.width = options.width;
      }
    }

    el.classList.add(`rv-autoscroll-${options.angle}`);

    setTimeout(() => {
      if (this.autoscroll) {
        (this.autoscroll as Autoscroll).destroy();
      }
      this.autoscroll = new Autoscroll(el, options);
    }, 1000);
  }

  unbind() {
    if (this.autoscroll) {
      (this.autoscroll as Autoscroll).destroy();
    }
  }
}
