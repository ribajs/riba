import { Riba, textBinder } from '@ribajs/core';
import { HumanizeFormatter } from './humanize.formatter';

const riba = new Riba();
riba.module.formatter.regist(HumanizeFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('humanize', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | humanize "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from humanize <strong>formatter</strong> !');
    });
  });
});
