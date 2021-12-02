import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { ToMomentFormatter } from './to-moment.formatter';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(ToMomentFormatter);
riba.module.binder.regist(TextBinder);

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
