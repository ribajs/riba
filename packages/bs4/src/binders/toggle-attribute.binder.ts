import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { TOGGLE_BUTTON, TOGGLE_ATTRIBUTE } from "../constants/index.js";

/**
 * Adds / removes the attribute on click on the bs4-toggle-button with the same id
 * E.g. with this binder you can toggle a hidden attribute to show / hide the element
 * Events
 * * `off`
 * * `on`
 */
export class ToggleAttributeBinder extends Binder<string, HTMLButtonElement> {
  static key = "bs4-toggle-attribute-*";

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

  private toggle(el: HTMLButtonElement) {
    if (this.state === "removed") {
      this.add.bind(this)(el);
    } else {
      this.remove.bind(this)(el);
    }
  }

  private remove(el: HTMLButtonElement) {
    const attributeName = this.args[0] as string;
    el.removeAttribute(attributeName);
    this.state = "removed";
    el.dispatchEvent(
      new CustomEvent(TOGGLE_ATTRIBUTE.elEventNames.removed, {
        detail: { attributeName },
      })
    );
    this.triggerState();
  }

  private add(el: HTMLButtonElement) {
    const attributeName = this.args[0] as string;

    el.setAttribute(attributeName, attributeName);
    this.state = "added";
    el.dispatchEvent(
      new CustomEvent(TOGGLE_ATTRIBUTE.elEventNames.added, {
        detail: { attributeName },
      })
    );
    this.triggerState();
  }

  bind(el: HTMLButtonElement) {
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

  routine(el: HTMLButtonElement, newId: string) {
    const oldId = this._getValue(el);

    if (oldId && this.toggleButtonEvents) {
      this.toggleButtonEvents.off(
        TOGGLE_BUTTON.eventNames.toggle,
        this.onToggle,
        this
      );
      this.toggleButtonEvents.off(
        TOGGLE_BUTTON.eventNames.init,
        this.triggerState,
        this
      );
    }

    if (!this.toggleButtonEvents) {
      this.toggleButtonEvents = new EventDispatcher(
        TOGGLE_BUTTON.nsPrefix + newId
      );
      this.toggleButtonEvents.on(
        TOGGLE_BUTTON.eventNames.toggle,
        this.onToggle,
        this
      );
      this.toggleButtonEvents.on(
        TOGGLE_BUTTON.eventNames.init,
        this.triggerState,
        this
      );
    }
  }
}
