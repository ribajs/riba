import { Riba, textBinder } from '@ribajs/core';
import { <%= classify(name) %>Formatter } from './<%= name %>.formatter';

const riba = new Riba();
riba.module.formatter.regist(<%= classify(name) %>Formatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('<%= camelize(name) formatter %>', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | <%= camelize(name) %> "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from <%= camelize(name) %> <strong>formatter</strong> !');
    });
  });
});
