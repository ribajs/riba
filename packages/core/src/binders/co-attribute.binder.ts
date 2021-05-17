import { Binder } from "../types";
import { BasicComponent } from "../component/basic-component";
import type { Observer } from "../observer";

/**
 * co-*
 * Pass a riba model / scope value to your component without first converting it as an attribute
 */
export const componentAttributeBinder: Binder<any, BasicComponent> = {
  name: "co-*",
  publishes: true,
  routine(el: BasicComponent, value: any) {
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
  bind(el) {
    const attrName = (this.args[0] as string).trim();
    this.customData = {
      componentAttributeObserver: el.observeAttribute(attrName, {
        sync: () => {
          this.publish();
        },
      }),
    };
  },

  unbind() {
    (
      this.customData.componentAttributeObserver as Observer | undefined
    )?.unobserve();
  },

  getValue(el: BasicComponent) {
    const attrName = (this.args[0] as string).trim();
    const val = el.getBinderAttribute(attrName);
    return val;
  },
};
