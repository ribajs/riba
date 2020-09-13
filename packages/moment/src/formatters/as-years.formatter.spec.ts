import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { AsYearsFormatter } from './as-years.formatter';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(AsYearsFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('as-years', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | as-years "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from as-years <strong>formatter</strong> !');
    });
  });
});
