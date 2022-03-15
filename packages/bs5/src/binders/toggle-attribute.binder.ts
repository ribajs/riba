import { Binder } from "@ribajs/core/src/index.js";
import { EventDispatcher } from "@ribajs/events";
import { TOGGLE_BUTTON, TOGGLE_ATTRIBUTE } from "../constants";

/**
 * Adds / removes the attribute on click on the bs5-toggle-button with the same id
 * E.g. with this binder you can toggle a hidden attribute to show / hide the element
 * Events
 * * `off`
 * * `on`
 */
export class ToggleAttributeBinder extends Binder<string, HTMLElement> {
  static key = "bs5-toggle-attribute-*";

  private toggleButtonEvents?: EventDispatcher;
  private state = "off";

  private _triggerState() {
    this.toggleButtonEvents?.trigger(
      TOGGLE_BUTTON.eventNames.state,
      this.state
    );
  }

  private triggerState = this._triggerState.bind(this);

  private _onToggle() {
    this.toggle.bind(this)(this.el);
  }

  private onToggle = this._onToggle.bind(this);

  private toggle(el: HTMLElement) {
    if (this.state === "removed") {
      this.add.bind(this)(el);
    } else {
      this.remove.bind(this)(el);
    }
  }

  private remove(el: HTMLElement) {
    const attributeName = this.args[0] as string;
    el.removeAttribute(attributeName);
    this.state = "removed";
    el.dispatchEvent(
      new CustomEvent(TOGGLE_ATTRIBUTE.elEventNames.removed, {
        detail: { attributeName }
      })
    );
    this.triggerState();
  }

  private add(el: HTMLElement) {
    const attributeName = this.args[0] as string;

    el.setAttribute(attributeName, attributeName);
    this.state = "added";
    el.dispatchEvent(
      new CustomEvent(TOGGLE_ATTRIBUTE.elEventNames.added, {
        detail: { attributeName }
      })
    );
    this.triggerState();
  }

  bind(el: HTMLElement) {
    const attributeName = this.args[0] as string;
    this.state = el.hasAttribute(attributeName) ? "added" : "removed";
  }

  unbind() {
    this.toggleButtonEvents?.off(
      TOGGLE_BUTTON.eventNames.toggle,
      this.onToggle,
      this
    );
    this.toggleButtonEvents?.off(
      TOGGLE_BUTTON.eventNames.init,
      this.triggerState,
      this
    );
  }

  routine(el: HTMLElement, newId: string) {
    const oldId = this._getValue(el);
    let toggleButton = this.toggleButtonEvents;
    if (oldId && toggleButton) {
      toggleButton.off(TOGGLE_BUTTON.eventNames.toggle, this.onToggle, this);
      toggleButton.off(TOGGLE_BUTTON.eventNames.init, this.triggerState, this);
    }

    if (!this.toggleButtonEvents) {
      this.toggleButtonEvents = new EventDispatcher(
        TOGGLE_BUTTON.nsPrefix + newId
      );
      toggleButton = this.toggleButtonEvents as EventDispatcher;
      toggleButton.on(TOGGLE_BUTTON.eventNames.toggle, this.onToggle, this);
      toggleButton.on(TOGGLE_BUTTON.eventNames.init, this.triggerState, this);
    }
  }
}
