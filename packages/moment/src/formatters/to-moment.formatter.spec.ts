import { Riba, textBinder } from '@ribajs/core';
import { ToMomentFormatter } from './to-moment.formatter';

const riba = new Riba();
riba.module.formatter.regist(ToMomentFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('to-moment', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | to-moment "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from to-moment <strong>formatter</strong> !');
    });
  });
});
