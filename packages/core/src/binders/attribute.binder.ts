import { Binder } from "../interfaces";
export interface BinderAttributeChangedEvent {
  detail: {
    name: string;
    oldValue: string;
    newValue: string;
    namespace: null;
  };
}

/**
 * Sets the attribute on the element. If no binder above is matched it will fall
 * back to using this binder.
 */
export const attributeBinder: Binder<string> = {
  name: "*",
  bind(/*el*/) {
    /**/
  },

  unbind() {
    delete this.customData;
  },

  routine(el: HTMLElement, newValue: string) {
    if (!this.type) {
      throw new Error("Can't set attribute of " + this.type);
    }

    const oldValue = el.getAttribute(this.type);

    if (newValue != null) {
      if (oldValue !== newValue) {
        el.setAttribute(this.type, newValue);
      }
    } else {
      el.removeAttribute(this.type);
    }
  },
};
