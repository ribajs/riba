import { Riba, textBinder } from '@ribajs/core';
import { WeeksFormatter } from './weeks.formatter';

const riba = new Riba();
riba.module.formatter.regist(WeeksFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('weeks', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | weeks "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from weeks <strong>formatter</strong> !');
    });
  });
});
