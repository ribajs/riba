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
 * Event handler to liste for publish binder event for two-way-binding in web components
 */
const publishBinderChangeEventHandler = function (this: any, event: Event) {
  const data = (event as CustomEvent).detail;
  const oldValue = this.observer.value();
  if (oldValue !== data.newValue) {
    // TODO this overwrites also the _rv counter
    this.observer.setValue(data.newValue);
  }
};

/**
 * Sets the attribute on the element. If no binder above is matched it will fall
 * back to using this binder.
 */
export const starBinder: Binder<string> = {
  name: "*",
  bind(el) {
    // Listen for changes from web component
    el.addEventListener(
      "publish-binder-change:" + this.type,
      publishBinderChangeEventHandler.bind(this)
    );
  },

  unbind() {
    delete this.customData;
    this.el.removeEventListener(
      "publish-binder-change",
      publishBinderChangeEventHandler.bind(this)
    );
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

    if (oldValue !== newValue) {
      // Fallback for MutationObserver and attributeChangedCallback: Trigger event to catch them in web components to call the attributeChangedCallback method
      el.dispatchEvent(
        new CustomEvent("binder-changed", {
          detail: {
            name: this.type,
            oldValue,
            newValue,
            namespace: null, // TODO
          },
        } as BinderAttributeChangedEvent)
      );
    }
  },
};
