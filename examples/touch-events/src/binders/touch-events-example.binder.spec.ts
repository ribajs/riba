import { Riba } from '@ribajs/core';

import { TouchEventsExampleBinder } from './touch-events-example.binder';

describe('riba.binders', () => {
  let el: HTMLUnknownElement;

  const riba = new Riba();
  riba.module.binder.regist(TouchEventsExampleBinder);

  beforeEach(() => {
    el = document.createElement('div');
    document.body.appendChild(el);
  });

  afterEach(() => {
    if (!el.parentNode) {
      throw new Error('el.parentNode is not defined!');
    }
    el.parentNode.removeChild(el);
  });

  describe('TouchEventsExample', () => {
    it('sets the element\'s text content', () => {
      (riba.binders['test-app-example'] as any).routine(el, '<em>hello</em>');
      expect(el.innerHTML).toEqual('<em>hello</em> from test-app-example <strong>binder</strong>!');
    });
  });
});
