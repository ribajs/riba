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
    const keyPath = this.keypath as string;
    const askEventName = "ask-for-attribute:" + keyPath;
    const notifyEventName = "notify-attribute-change:" + keyPath;
    this.customData = {
      onAskForAttributeValue: () => {
        this.binder.triggerAttributeValue.call(
          this,
          el,
          this.view.models[keyPath]
        );
      },
      onNotifyNewAttributeValue: (event: CustomEvent<any>) => {
        if (this.view.models[keyPath] !== event.detail.newValue) {
          this.view.models[keyPath] = event.detail.newValue;
        }
      },
    };
    console.debug("bind eventName", askEventName);
    el.addEventListener(
      askEventName as any,
      this.customData.onAskForAttributeValue,
      false
    );
    el.addEventListener(
      notifyEventName as any,
      this.customData.onNotifyNewAttributeValue,
      false
    );
  },

  unbind(el) {
    // const attrName = (this.args[0] as string).trim();
    const keyPath = this.keypath;
    el.removeEventListener(
      ("ask-for-attribute:" + keyPath) as any,
      this.customData.onAskForAttributeValue,
      false
    );
    el.removeEventListener(
      "notify-attribute-change:" + keyPath,
      this.customData.onNotifyNewAttributeValue,
      false
    );
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
