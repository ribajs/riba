import { Riba, textBinder } from '@ribajs/core';
import { AsWeeksFormatter } from './as-weeks.formatter';

const riba = new Riba();
riba.module.formatter.regist(AsWeeksFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('as-weeks', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | as-weeks "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from as-weeks <strong>formatter</strong> !');
    });
  });
});
