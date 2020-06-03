import { Binder, EventDispatcher } from "@ribajs/core";

export interface Bs4ToggleAttribute extends Binder<boolean> {
  toggleButtonEvents: EventDispatcher | null;
  state: "removed" | "added";
  triggerState: () => void;
  onToggle: () => void;
  toggle: (el: HTMLElement) => void;
  remove: (el: HTMLElement) => void;
  add: (el: HTMLElement) => void;
}

import { TOGGLE_BUTTON, TOGGLE_ATTRIBUTE } from "../constants";

/**
 * Adds / removes the attribute on click on the bs4-toggle-button with the same id
 * E.g. with this binder you can toggle a hidden attribute to show / hide the element
 * Events
 * * `off`
 * * `on`
 */
export const toggleAttributeBinder: Binder<string> = {
  name: "bs4-toggle-attribute-*",
  toggleButtonEvents: null,
  state: "off",
  triggerState() {
    const self = (this.binder || this) as Bs4ToggleAttribute;
    self.toggleButtonEvents?.trigger(
      TOGGLE_BUTTON.eventNames.state,
      self.state
    );
  },
  onToggle() {
    const self = (this.binder || this) as Bs4ToggleAttribute;
    // console.debug('onToggle', (this.binder as Bs4ToggleAttribute));
    self.toggle.bind(this)(this.el);
  },
  toggle(el: HTMLElement) {
    const self = (this.binder || this) as Bs4ToggleAttribute;
    if (self.state === "removed") {
      self.add.bind(this)(el);
    } else {
      self.remove.bind(this)(el);
    }
  },
  remove(el: HTMLElement) {
    const self = (this.binder || this) as Bs4ToggleAttribute;
    const attributeName = this.args[0] as string;
    el.removeAttribute(attributeName);
    self.state = "removed";
    el.dispatchEvent(
      new CustomEvent(TOGGLE_ATTRIBUTE.elEventNames.removed, {
        detail: { attributeName },
      })
    );
    self.triggerState();
  },
  add(el: HTMLElement) {
    const self = (this.binder || this) as Bs4ToggleAttribute;
    const attributeName = this.args[0] as string;

    el.setAttribute(attributeName, attributeName);
    self.state = "added";
    el.dispatchEvent(
      new CustomEvent(TOGGLE_ATTRIBUTE.elEventNames.added, {
        detail: { attributeName },
      })
    );
    self.triggerState();
  },
  bind(el) {
    const self = (this.binder || this) as Bs4ToggleAttribute;
    const attributeName = this.args[0] as string;
    self.state = el.hasAttribute(attributeName) ? "added" : "removed";
  },

  unbind() {
    const self = (this.binder || this) as Bs4ToggleAttribute;
    self.toggleButtonEvents?.off(
      TOGGLE_BUTTON.eventNames.toggle,
      self.onToggle.bind(this)
    );
    self.toggleButtonEvents?.off(
      TOGGLE_BUTTON.eventNames.init,
      self.triggerState.bind(this)
    );
  },

  routine(el: HTMLElement, newId: string) {
    const oldId = this.getValue(el);
    const self = (this.binder || this) as Bs4ToggleAttribute;
    let toggleButton = self.toggleButtonEvents;
    if (oldId && toggleButton) {
      toggleButton.off(
        TOGGLE_BUTTON.eventNames.toggle,
        self.onToggle.bind(this)
      );
      toggleButton.off(
        TOGGLE_BUTTON.eventNames.init,
        self.triggerState.bind(this)
      );
    }

    if (!self.toggleButtonEvents) {
      self.toggleButtonEvents = new EventDispatcher(
        TOGGLE_BUTTON.nsPrefix + newId
      );
      toggleButton = self.toggleButtonEvents as EventDispatcher;
      toggleButton.on(
        TOGGLE_BUTTON.eventNames.toggle,
        self.onToggle.bind(this)
      );
      toggleButton.on(
        TOGGLE_BUTTON.eventNames.init,
        self.triggerState.bind(this)
      );
    }
  },
};
