import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { ToMomentFormatter } from "./to-moment.formatter.js";
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(ToMomentFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  value: moment.MomentInput;
}

describe('riba.formatters', () => {

  describe('to-moment', () => {
    let model: Model = {
      value: new Date(),
    };

    it('The "toMoment" formatter should give the same value as the "moment()" function', () => {
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'value | toMoment');
      riba.bind(el, model);
      expect(el.textContent).toEqual(moment(model.value).toString());
    });
  });
});
