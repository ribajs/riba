import { Riba, textBinder } from '@ribajs/core';
import { MonthsFormatter } from './months.formatter';

const riba = new Riba();
riba.module.formatter.regist(MonthsFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('months', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | months "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from months <strong>formatter</strong> !');
    });
  });
});
