import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { TOGGLE_BUTTON, TOGGLE_CLASS } from "../constants/index.js";

/**
 * Adds / removes the class on click on the bs5-toggle-button with the same id
 *
 * Events
 * * `off`
 * * `on`
 */
export class ToggleClassBinder extends Binder<string, HTMLButtonElement> {
  static key = "bs5-toggle-class-*";

  private toggleButtonEvents?: EventDispatcher;
  private state = "off";

  private _triggerState() {
    this.toggleButtonEvents?.trigger(
      TOGGLE_BUTTON.eventNames.state,
      this.state,
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
    const className = this.args[0] as string;
    el.classList.remove(className);
    this.state = "removed";
    el.dispatchEvent(
      new CustomEvent(TOGGLE_CLASS.elEventNames.removed, {
        detail: { className },
      }),
    );
    this.triggerState();
  }

  private add(el: HTMLButtonElement) {
    const className = this.args[0] as string;

    el.classList.add(className, className);
    this.state = "added";
    el.dispatchEvent(
      new CustomEvent(TOGGLE_CLASS.elEventNames.added, {
        detail: { className },
      }),
    );
    this.triggerState();
  }

  bind(el: HTMLButtonElement) {
    const className = this.args[0] as string;
    this.state = el.classList.contains(className) ? "added" : "removed";
  }

  unbind() {
    this.toggleButtonEvents?.off(
      TOGGLE_BUTTON.eventNames.toggle,
      this.onToggle,
      this,
    );
    this.toggleButtonEvents?.off(
      TOGGLE_BUTTON.eventNames.init,
      this.triggerState,
      this,
    );
  }

  routine(el: HTMLButtonElement, newId: string) {
    const oldId = this._getValue(el);
    let toggleButton = this.toggleButtonEvents;
    if (oldId && toggleButton) {
      toggleButton.off(TOGGLE_BUTTON.eventNames.toggle, this.onToggle, this);
      toggleButton.off(TOGGLE_BUTTON.eventNames.init, this.triggerState, this);
    }

    if (!this.toggleButtonEvents) {
      this.toggleButtonEvents = new EventDispatcher(
        TOGGLE_BUTTON.nsPrefix + newId,
      );
      toggleButton = this.toggleButtonEvents as EventDispatcher;
      toggleButton.on(TOGGLE_BUTTON.eventNames.toggle, this.onToggle, this);
      toggleButton.on(TOGGLE_BUTTON.eventNames.init, this.triggerState, this);
    }
  }
}
