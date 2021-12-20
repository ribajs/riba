import { Binder } from "../binder";
import { BasicComponent } from "../component/basic-component";
import type { Observer } from "../observer";
import { isCustomElement, waitForCustomElement } from "@ribajs/utils";

const NO_RIBA_COMPONENT_ERROR_MESSAGE = '[componentAttributeBinder] You can only use the "rv-co-*" binder on Riba components, but "{tagName}" is not registered.';

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
        NO_RIBA_COMPONENT_ERROR_MESSAGE.replace("{tagName}", el.tagName),
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
        NO_RIBA_COMPONENT_ERROR_MESSAGE.replace("{tagName}", el.tagName),
        el
      );
    }
  }

  private bindIntern(el: BasicComponent) {
    const attrName = (this.args[0] as string).trim();
    if (typeof el.observeAttribute !== "function") {
      console.warn(
        NO_RIBA_COMPONENT_ERROR_MESSAGE.replace("{tagName}", el.tagName),
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
        NO_RIBA_COMPONENT_ERROR_MESSAGE.replace("{tagName}", el.tagName),
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
}
