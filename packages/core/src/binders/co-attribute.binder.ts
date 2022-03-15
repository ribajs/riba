import { Binder } from "../binder.js";
import { BasicComponent } from "../component/basic-component.js";
import type { Observer } from "../observer.js";
import {
  isCustomElement,
  waitForCustomElement
} from "@ribajs/utils/src/index.js";

const NO_RIBA_COMPONENT_ERROR_MESSAGE =
  '[componentAttributeBinder] You can only use the "rv-co-*" binder on Riba components, but "{tagName}" is not registered.';

/**
 * co-*
 * Pass a riba model / scope value to your component without first converting it as an attribute
 */
export class ComponentAttributeBinder extends Binder<any, BasicComponent> {
  static key = "co-*";
  publishes = true;

  protected componentAttributeObserver?: Observer;
  protected attributeName?: string;

  protected __routine(el: BasicComponent, value: any) {
    const attrName = (this.args[0] as string).trim();
    if (el.setBinderAttribute) {
      el.setBinderAttribute(attrName, value);
    } else {
      console.warn(
        NO_RIBA_COMPONENT_ERROR_MESSAGE.replace("{tagName}", el.tagName),
        el
      );
    }
  }

  async routine(el: BasicComponent, value: any) {
    if (isCustomElement(el, true, true)) {
      this.__routine(el, value);
    } else if (isCustomElement(el, true)) {
      await waitForCustomElement(el);
      this.__routine(el, value);
    } else {
      console.warn(
        NO_RIBA_COMPONENT_ERROR_MESSAGE.replace("{tagName}", el.tagName),
        el
      );
    }
  }

  protected __bind(el: BasicComponent) {
    this.attributeName = this.args[0].toString().trim();
    if (typeof el.observeAttribute !== "function") {
      console.warn(
        NO_RIBA_COMPONENT_ERROR_MESSAGE.replace("{tagName}", el.tagName),
        el
      );
      return;
    }
    this.componentAttributeObserver = el.observeAttribute(this.attributeName, {
      sync: () => {
        this.publish();
      }
    });
  }

  async bind(el: BasicComponent) {
    if (isCustomElement(el, true, true)) {
      this.__bind(el);
    } else if (isCustomElement(el, true)) {
      await waitForCustomElement(el);
      this.__bind(el);
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
