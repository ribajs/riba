import { Riba, textBinder } from '@ribajs/core';
import { TouchEventsExampleFormatter } from './touch-events-example.formatter';

const riba = new Riba();
riba.module.formatter.regist(TouchEventsExampleFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('touch-events-example', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | touch-events-example "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from touch-events-example <strong>formatter</strong> !');
    });
  });
});
