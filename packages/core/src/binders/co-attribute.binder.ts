import { Binder } from "../binder";
import { BasicComponent } from "../component/basic-component";
import type { Observer } from "../observer";
import { isCustomElement, waitForCustomElement } from "@ribajs/utils";

/**
 * co-*
 * Pass a riba model / scope value to your component without first converting it as an attribute
 */
export class ComponentAttributeBinder extends Binder<any, BasicComponent> {
  static key = "co-*";
  publishes = true;

  private componentAttributeObserver?: Observer;

  private routineIntern(el: BasicComponent, value: any) {
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
  }

  async routine(el: BasicComponent, value: any) {
    if (isCustomElement(el, true, true)) {
      this.routineIntern(el, value);
    } else if (isCustomElement(el, true)) {
      await waitForCustomElement(el);
      this.routineIntern(el, value);
    } else {
      console.warn(
        "[componentAttributeBinder] You can only use this binder on Riba components",
        el
      );
    }
  }

  private bindIntern(el: BasicComponent) {
    const attrName = (this.args[0] as string).trim();
    if (typeof el.observeAttribute !== "function") {
      console.warn(
        "[componentAttributeBinder] You can only use this binder on Riba components",
        el
      );
      return;
    }
    this.componentAttributeObserver = el.observeAttribute(attrName, {
      sync: () => {
        this.publish();
      },
    });
  }

  async bind(el: BasicComponent) {
    if (isCustomElement(el, true, true)) {
      this.bindIntern(el);
    } else if (isCustomElement(el, true)) {
      await waitForCustomElement(el);
      this.bindIntern(el);
    } else {
      console.warn(
        "[componentAttributeBinder] You can only use this binder on Riba components",
        el
      );
    }
  }

  unbind() {
    this.componentAttributeObserver?.unobserve();
  }

  getValue(el: BasicComponent) {
    const attrName = (this.args[0] as string).trim();
    const val = el.getBinderAttribute(attrName);
    return val;
  }
};
