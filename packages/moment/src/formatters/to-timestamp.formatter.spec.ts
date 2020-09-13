import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { ToTimestampFormatter } from './to-timestamp.formatter';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(ToTimestampFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('to-timestamp', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | to-timestamp "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from to-timestamp <strong>formatter</strong> !');
    });
  });
});
