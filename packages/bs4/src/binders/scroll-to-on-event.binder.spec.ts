import { Riba, dotAdapter } from '@ribajs/core';

import { ScrollToOnEventBinder } from "./scroll-to-on-event.binder.js";

describe('riba.binders', () => {
  let el: HTMLDivElement;
  let scrollToMeEl: HTMLDivElement;
  let fragment: DocumentFragment;
  const model: any = {};

  const riba = new Riba();
  riba.module.adapter.register(dotAdapter);
  riba.module.binder.register(ScrollToOnEventBinder);

  beforeEach(() => {

    fragment = document.createDocumentFragment();

    el = document.createElement('div');
    el.setAttribute('rv-scroll-to-on-click', '#scrollToMe');
    fragment.appendChild(el);
    scrollToMeEl = document.createElement('div');
    scrollToMeEl.id = '#scrollToMe';
    fragment.appendChild(el);
  });

  afterEach(() => {
    if (!el.parentNode) {
      throw new Error('el.parentNode is not defined!');
    }
    el.parentNode.removeChild(el);
  });

  describe('ScrollToOnEvent', () => {
    it('Should bind riba without an error', () => {
      riba.bind(fragment, model);
    });
  });
});
