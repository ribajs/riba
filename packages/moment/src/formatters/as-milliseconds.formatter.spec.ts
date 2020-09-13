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

  describe('as-milliseconds', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | as-milliseconds "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from as-milliseconds <strong>formatter</strong> !');
    });
  });
});
