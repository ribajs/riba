import { Binder, EventDispatcher } from '@ribajs/core';

export interface Bs4Toggle extends Binder<boolean> {
  toggleButtonEvents: EventDispatcher | null;
  state: 'hidden' | 'visable';
  triggerState: () => void;
  onToggle: () => void;
  toggle: (el: HTMLElement) => void;
  show: (el: HTMLElement) => void;
  hide: (el: HTMLElement) => void;
}

import {
  TOGGLE_BUTTON, TOGGLE_ITEM,
} from '../constants';

/**
 * Toggles an element visable or hidden with the bs4-toggle-button
 * Add the `hidden` attribute to the element if the element should be hidden from the beginning
 * 
 * Events
 * * `show`
 * * `hide`
 */
export const toggleItemBinder: Binder<string> = {
  name: 'bs4-toggle-item',
  toggleButtonEvents: null,
  state: 'visable',
  triggerState() {
    const self = (this.binder || this) as Bs4Toggle;
    self.toggleButtonEvents?.trigger(TOGGLE_BUTTON.eventNames.state, self.state);
  },
  onToggle() {
    const self = (this.binder || this) as Bs4Toggle;
    // console.debug('onToggle', (this.binder as Bs4Toggle));
    self.toggle(this.el);
  },
  toggle(el: HTMLElement) {
    if (this.state === 'hidden') {
      this.show(el);
    } else {
      this.hide(el);
    }
  },
  show(el: HTMLElement) {
    el.removeAttribute('hidden');
    this.state = 'visable'
    el.dispatchEvent(new Event(TOGGLE_ITEM.elEventNames.show));
    this.triggerState();
  },
  hide(el: HTMLElement) {
    el.setAttribute('hidden', 'hidden');
    this.state = 'hidden';
    el.dispatchEvent(new Event(TOGGLE_ITEM.elEventNames.hide));
    this.triggerState();
  },
  bind(el) {
    const self = (this.binder || this) as Bs4Toggle;
    self.state = el.hasAttribute('hidden') ? 'hidden' : 'visable'
  },

  unbind() {
    const self = (this.binder || this) as Bs4Toggle;
    self.toggleButtonEvents?.off(TOGGLE_BUTTON.eventNames.toggle, self.onToggle.bind(this));
    self.toggleButtonEvents?.off(TOGGLE_BUTTON.eventNames.init, self.triggerState.bind(this));
  },

  routine(el: HTMLElement, newId: string) {
    const oldId = this.getValue(el);
    const self = (this.binder || this) as Bs4Toggle;
    let toggleButton = self.toggleButtonEvents;
    if (oldId && toggleButton) {
      toggleButton.off(TOGGLE_BUTTON.eventNames.toggle, self.onToggle.bind(this));
      toggleButton.off(TOGGLE_BUTTON.eventNames.init, self.triggerState.bind(this));
    }

    if(!self.toggleButtonEvents) {
      self.toggleButtonEvents = new EventDispatcher(TOGGLE_BUTTON.nsPrefix + newId);
      toggleButton = self.toggleButtonEvents as EventDispatcher;
      toggleButton.on(TOGGLE_BUTTON.eventNames.toggle, self.onToggle.bind(this));
      toggleButton.on(TOGGLE_BUTTON.eventNames.init, self.triggerState.bind(this));
    }
    
  },
};
