import { Riba, textBinder } from '@ribajs/core';
import { DateFormatter } from './date.formatter';

const riba = new Riba();
riba.module.formatter.regist(DateFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('date', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | date "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from date <strong>formatter</strong> !');
    });
  });
});
