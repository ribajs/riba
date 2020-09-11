import { Riba, textBinder } from '@ribajs/core';
import { HoursFormatter } from './hours.formatter';

const riba = new Riba();
riba.module.formatter.regist(HoursFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('hours', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | hours "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from hours <strong>formatter</strong> !');
    });
  });
});
