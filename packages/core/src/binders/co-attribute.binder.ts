import { Binder } from "../interfaces";

/**
 * parent
 * Passses a riba model / scope value to your component without first converting it as an attribute
 */
export const componentAttributeBinder: Binder<any> = {
  name: "co-*",
  routine(el: HTMLElement, value: any) {
    console.debug("componentAttributeBinder routine this", this);
    console.debug("componentAttributeBinder routine value", value);
    this.binder.triggerAttributeValue.call(this, el, value);
  },
  bind(el) {
    // const attrName = (this.args[0] as string).trim();
    const attrName = this.keypath;
    const eventName = "ask-for-attribute:" + attrName;
    console.debug("bind eventName", eventName);
    el.addEventListener(eventName as any, this.binder.onAskForAttributeValue.bind(this, el), false);
  },

  unbind(el) {
    // const attrName = (this.args[0] as string).trim();
    const attrName = this.keypath;
    el.removeEventListener(("ask-for-attribute:" + attrName) as any, this.binder.onAskForAttributeValue.bind(this), false);
  },

  onAskForAttributeValue(el: HTMLElement) {
    if (this.getValue) {
      // const attrName = (this.args[0] as string).trim();
      const attrName = this.keypath;
      this.binder.triggerAttributeValue.call(this, el, this.view.models[attrName]);
    } else {
      console.warn("[componentAttributeBinder] this.getValue is not defined");
    }
  },

  triggerAttributeValue(el: HTMLElement, value: any) {
    const attrName = (this.args[0] as string).trim();
    const eventName = "attribute:" + attrName;
    console.debug("triggerAttributeValue newValue", value);
    console.debug("triggerAttributeValue eventName", eventName);
    el.dispatchEvent(
      new CustomEvent(eventName, {
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
