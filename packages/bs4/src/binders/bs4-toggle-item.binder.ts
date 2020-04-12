import { Binder, EventDispatcher } from '@ribajs/core';

export interface Bs4Toggle extends Binder<boolean> {
  toggleButtonEvents: EventDispatcher | null;
  state: 'hidden' | 'visable';
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
    (this.binder as Bs4Toggle).toggleButtonEvents?.trigger(TOGGLE_BUTTON.eventNames.state, (this.binder as Bs4Toggle).state);
  },
  onToggle() {
    // console.debug('onToggle', (this.binder as Bs4Toggle));
    (this.binder as Bs4Toggle).toggle(this.el);
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
    el.dispatchEvent(new Event(TOGGLE_ITEM.elEventNames.show))
  },
  hide(el: HTMLElement) {
    el.setAttribute('hidden', 'hidden');
    this.state = 'hidden';
    el.dispatchEvent(new Event(TOGGLE_ITEM.elEventNames.hide))
  },
  bind(el) {
    (this.binder as Bs4Toggle).state = el.hasAttribute('hidden') ? 'hidden' : 'visable'
  },

  unbind() {
    (this.binder as Bs4Toggle).toggleButtonEvents?.off(TOGGLE_BUTTON.eventNames.toggle, (this.binder as Bs4Toggle).onToggle.bind(this));
    (this.binder as Bs4Toggle).toggleButtonEvents?.off(TOGGLE_BUTTON.eventNames.init, (this.binder as Bs4Toggle).triggerState.bind(this));
  },

  routine(el: HTMLElement, newId: string) {
    const oldId = this.getValue(el);
    let toggleButton = (this.binder as Bs4Toggle).toggleButtonEvents;
    if (oldId && toggleButton) {
      toggleButton.off(TOGGLE_BUTTON.eventNames.toggle, (this.binder as Bs4Toggle).onToggle.bind(this));
      toggleButton.off(TOGGLE_BUTTON.eventNames.init, (this.binder as Bs4Toggle).triggerState.bind(this));
    }

    if(!(this.binder as Bs4Toggle).toggleButtonEvents) {
      (this.binder as Bs4Toggle).toggleButtonEvents = new EventDispatcher(TOGGLE_BUTTON.nsPrefix + newId);
      toggleButton = (this.binder as Bs4Toggle).toggleButtonEvents as EventDispatcher;
      toggleButton.on(TOGGLE_BUTTON.eventNames.toggle, (this.binder as Bs4Toggle).onToggle.bind(this));
      toggleButton.on(TOGGLE_BUTTON.eventNames.init, (this.binder as Bs4Toggle).triggerState.bind(this));
    }
    
  },
};
