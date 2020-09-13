import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { AsMillisecondsFormatter } from './as-milliseconds.formatter';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(AsMillisecondsFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('asMilliseconds', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | asMilliseconds "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from asMilliseconds <strong>formatter</strong> !');
    });
  });
});
