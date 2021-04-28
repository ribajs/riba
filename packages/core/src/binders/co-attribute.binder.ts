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
      el.setBinderAttribute(attrName, value);
    } else {
      console.warn(
        "[componentAttributeBinder] You can only this binder on Riba components"
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
    (this.customData.componentAttributeObserver as
      | Observer
      | undefined)?.unobserve();
  },

  getValue(el: BasicComponent) {
    const attrName = (this.args[0] as string).trim();
    const val = el.getBinderAttribute(attrName);
    return val;
  },
};
