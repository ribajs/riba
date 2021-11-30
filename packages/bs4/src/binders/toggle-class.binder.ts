import { BinderDeprecated } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";

export interface Bs4ToggleClass extends Binder<boolean> {
  toggleButtonEvents: EventDispatcher | null;
  state: "removed" | "added";
  triggerState: () => void;
  onToggle: () => void;
  toggle: (el: HTMLElement) => void;
  remove: (el: HTMLElement) => void;
  add: (el: HTMLElement) => void;
}

import { TOGGLE_BUTTON, TOGGLE_CLASS } from "../constants";

/**
 * Adds / removes the class on click on the bs4-toggle-button with the same id
 *
 * Events
 * * `off`
 * * `on`
 */
export const toggleClassBinder: BinderDeprecated<string> = {
  name: "bs4-toggle-class-*",
  toggleButtonEvents: null,
  state: "off",
  triggerState() {
    const self = (this.binder || this) as Bs4ToggleClass;
    self.toggleButtonEvents?.trigger(
      TOGGLE_BUTTON.eventNames.state,
      self.state
    );
  },
  onToggle() {
    const self = (this.binder || this) as Bs4ToggleClass;
    // console.debug('onToggle', (this.binder as Bs4ToggleClass));
    self.toggle.bind(this)(this.el);
  },
  toggle(el: HTMLElement) {
    const self = (this.binder || this) as Bs4ToggleClass;
    if (self.state === "removed") {
      self.add.bind(this)(el);
    } else {
      self.remove.bind(this)(el);
    }
  },
  remove(el: HTMLElement) {
    const self = (this.binder || this) as Bs4ToggleClass;
    const className = this.args[0] as string;
    el.classList.remove(className);
    self.state = "removed";
    el.dispatchEvent(
      new CustomEvent(TOGGLE_CLASS.elEventNames.removed, {
        detail: { className },
      })
    );
    self.triggerState();
  },
  add(el: HTMLElement) {
    const self = (this.binder || this) as Bs4ToggleClass;
    const className = this.args[0] as string;

    el.classList.add(className, className);
    self.state = "added";
    el.dispatchEvent(
      new CustomEvent(TOGGLE_CLASS.elEventNames.added, {
        detail: { className },
      })
    );
    self.triggerState();
  },
  bind(el) {
    const self = (this.binder || this) as Bs4ToggleClass;
    const className = this.args[0] as string;
    self.state = el.classList.contains(className) ? "added" : "removed";
  },

  unbind() {
    const self = (this.binder || this) as Bs4ToggleClass;
    self.toggleButtonEvents?.off(
      TOGGLE_BUTTON.eventNames.toggle,
      self.onToggle,
      self
    );
    self.toggleButtonEvents?.off(
      TOGGLE_BUTTON.eventNames.init,
      self.triggerState,
      self
    );
  },

  routine(el: HTMLElement, newId: string) {
    const oldId = this.getValue(el);
    const self = (this.binder || this) as Bs4ToggleClass;
    let toggleButton = self.toggleButtonEvents;
    if (oldId && toggleButton) {
      toggleButton.off(TOGGLE_BUTTON.eventNames.toggle, self.onToggle, this);
      toggleButton.off(TOGGLE_BUTTON.eventNames.init, self.triggerState, this);
    }

    if (!self.toggleButtonEvents) {
      self.toggleButtonEvents = new EventDispatcher(
        TOGGLE_BUTTON.nsPrefix + newId
      );
      toggleButton = self.toggleButtonEvents as EventDispatcher;
      toggleButton.on(TOGGLE_BUTTON.eventNames.toggle, self.onToggle, this);
      toggleButton.on(TOGGLE_BUTTON.eventNames.init, self.triggerState, this);
    }
  },
};
