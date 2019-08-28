import { Riba, textBinder } from '@ribajs/core';
import { <%= classify(name) %>Formatter } from './<%= name %>.formatter';

const riba = new Riba();
riba.module.formatter.regist(<%= classify(name) %>Formatter);
riba.module.binder.regist(textBinder);

interface IModel {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('<%= name %>', () => {
    let model: IModel = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | <%= name %> "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from <%= name %> <strong>formatter</strong> !');
    });
  });
});
