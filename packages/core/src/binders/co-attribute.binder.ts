import { Binder } from "../types";
import { BasicComponent } from "../component/basic-component";
import type { Observer } from "../observer";
import { isCustomElement, waitForCustomElement } from "@ribajs/utils";

/**
 * co-*
 * Pass a riba model / scope value to your component without first converting it as an attribute
 */
export const componentAttributeBinder: Binder<any, BasicComponent> = {
  name: "co-*",
  publishes: true,
  _routine(el: BasicComponent, value: any) {
    const attrName = (this.args[0] as string).trim();
    if (el.setBinderAttribute) {
      if (typeof value !== "undefined") {
        el.setBinderAttribute(attrName, value);
      }
    } else {
      console.warn(
        "[componentAttributeBinder] You can only use this binder on Riba components",
        el
      );
    }
  },
  async routine(el: BasicComponent, value: any) {
    if (isCustomElement(el, true, true)) {
      componentAttributeBinder._routine.call(this, el, value);
    } else if (isCustomElement(el, true)) {
      await waitForCustomElement(el);
      componentAttributeBinder._routine.call(this, el, value);
    } else {
      console.warn(
        "[componentAttributeBinder] You can only use this binder on Riba components",
        el
      );
    }
  },
  _bind(el: BasicComponent) {
    const attrName = (this.args[0] as string).trim();
    if (typeof el.observeAttribute !== "function") {
      console.warn(
        "[componentAttributeBinder] You can only use this binder on Riba components",
        el
      );
      return;
    }
    this.customData = {
      componentAttributeObserver: el.observeAttribute(attrName, {
        sync: () => {
          this.publish();
        },
      }),
    };
  },
  async bind(el) {
    if (isCustomElement(el, true, true)) {
      componentAttributeBinder._bind.call(this, el);
    } else if (isCustomElement(el, true)) {
      await waitForCustomElement(el);
      componentAttributeBinder._bind.call(this, el);
    } else {
      console.warn(
        "[componentAttributeBinder] You can only use this binder on Riba components",
        el
      );
    }
  },

  unbind() {
    (
      this.customData?.componentAttributeObserver as Observer | undefined
    )?.unobserve();
  },

  getValue(el: BasicComponent) {
    const attrName = (this.args[0] as string).trim();
    const val = el.getBinderAttribute(attrName);
    return val;
  },
};
