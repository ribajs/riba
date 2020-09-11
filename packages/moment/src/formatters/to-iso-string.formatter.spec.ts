import { Riba, textBinder } from '@ribajs/core';
import { ToISOStringFormatter } from './to-iso-string.formatter';

const riba = new Riba();
riba.module.formatter.regist(ToISOStringFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('to-isodate-string', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | to-isodate-string "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from to-isodate-string <strong>formatter</strong> !');
    });
  });
});
