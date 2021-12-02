import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { mapFormatter } from './map.formatter';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(mapFormatter);
riba.module.binder.regist(TextBinder);

interface Model {
  Math: Math;
  value: 10;
  method: 'sin';
}

describe('riba.formatters', () => {

  describe('map', () => {
    let model: Model = { Math, value: 10, method: 'sin' };

    it('The example string should be added to the value of the model', () => {
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'value | map Math method');
      riba.bind(el, model);
      expect(el.textContent).toEqual(Math.sin(10).toString());
    });
  });
});
