import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { TOGGLE_BUTTON } from "../constants/index.js";

export interface ToggleEventNames {
  readonly added: string;
  readonly removed: string;
}

type ToggleState = "added" | "removed" | "off";

/**
 * Shared base for `tw-toggle-class-*` and `tw-toggle-attribute-*`.
 *
 * Subclasses provide the DOM-mutation primitives; this base handles the state
 * machine + the wiring to the `tw-toggle-button` EventDispatcher namespace.
 */
export abstract class AbstractToggleBinder<
  E extends HTMLElement = HTMLElement,
> extends Binder<string, E> {
  protected toggleButtonEvents?: EventDispatcher;
  protected state: ToggleState = "off";

  /** The event names dispatched on the bound element for this toggle kind. */
  protected abstract readonly eventNames: ToggleEventNames;

  /** Apply the "added" side effect on the element. */
  protected abstract applyAdd(el: E, value: string): void;

  /** Apply the "removed" side effect on the element. */
  protected abstract applyRemove(el: E, value: string): void;

  /** Detect whether the element currently has the toggle applied. */
  protected abstract detectState(el: E, value: string): boolean;

  private _triggerState() {
    this.toggleButtonEvents?.trigger(
      TOGGLE_BUTTON.eventNames.state,
      this.state,
    );
  }

  protected triggerState = this._triggerState.bind(this);

  private _onToggle() {
    this.toggle(this.el);
  }

  protected onToggle = this._onToggle.bind(this);

  protected toggle(el: E) {
    if (this.state === "removed") {
      this.add(el);
    } else {
      this.remove(el);
    }
  }

  protected remove(el: E) {
    const value = this.args[0] as string;
    this.applyRemove(el, value);
    this.state = "removed";
    el.dispatchEvent(
      new CustomEvent(this.eventNames.removed, {
        detail: { value },
      }),
    );
    this.triggerState();
  }

  protected add(el: E) {
    const value = this.args[0] as string;
    this.applyAdd(el, value);
    this.state = "added";
    el.dispatchEvent(
      new CustomEvent(this.eventNames.added, {
        detail: { value },
      }),
    );
    this.triggerState();
  }

  bind(el: E) {
    const value = this.args[0] as string;
    this.state = this.detectState(el, value) ? "added" : "removed";
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

  routine(el: E, newId: string) {
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
      toggleButton = this.toggleButtonEvents;
      toggleButton.on(TOGGLE_BUTTON.eventNames.toggle, this.onToggle, this);
      toggleButton.on(TOGGLE_BUTTON.eventNames.init, this.triggerState, this);
    }
  }
}
