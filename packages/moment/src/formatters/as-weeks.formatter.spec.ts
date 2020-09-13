import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { AsWeeksFormatter } from './as-weeks.formatter';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(AsWeeksFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('asWeeks', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | asWeeks "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from asWeeks <strong>formatter</strong> !');
    });
  });
});
