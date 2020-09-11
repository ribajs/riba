import { Riba, textBinder } from '@ribajs/core';
import { DurationFormatter } from './duration.formatter';

const riba = new Riba();
riba.module.formatter.regist(DurationFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('duration', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | duration "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from duration <strong>formatter</strong> !');
    });
  });
});
