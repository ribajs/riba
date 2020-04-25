import { Binder } from "../interfaces";

/**
 * parent
 * Passses a riba model / scope value to your component without first converting it as an attribute
 */
export const componentAttributeBinder: Binder<any> = {
  name: "co-*",
  routine(el: HTMLElement, value: any) {
    this.binder.triggerAttributeValue.bind(this)(el, value);
  },
  bind(el) {
    const attrName = (this.args[0] as string).trim();
    el.addEventListener(
      ("ask-for-attribute:" + attrName) as any,
      this.binder.onAskForAttributeValue.bind(this, el),
      false
    );
    // this.binder.triggerAttributeValue.bind(this)(el, undefined);
  },

  unbind(el) {
    const attrName = (this.args[0] as string).trim();
    el.removeEventListener(
      ("ask-for-attribute:" + attrName) as any,
      this.binder.onAskForAttributeValue.bind(this),
      false
    );
  },

  onAskForAttributeValue(el: HTMLElement) {
    if (this.getValue) {
      const value = (this as any).getValue(el);
      this.triggerAttributeValue(el, value);
    } else {
      console.warn("this.getValue is not defined");
    }
  },

  triggerAttributeValue(el: HTMLElement, value: any) {
    // console.debug("triggerAttributeValue", el, this.view.models);
    const attrName = (this.args[0] as string).trim();
    el.dispatchEvent(
      new CustomEvent("attribute:" + attrName, {
        detail: {
          name: attrName,
          oldValue: undefined,
          newValue: value,
          namespace: null,
        },
      })
    );
  },
};
