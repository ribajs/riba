import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { ToDateFormatter } from './to-date.formatter';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(ToDateFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: number;
  };
}

describe('riba.formatters', () => {

  describe('toDate', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "toDate" formatter should give the same value as the "moment.unix(...).toDate()" method', () => {
      model.obj = {
        value: Date.now(),
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | toDate');
      riba.bind(el, model);
      expect(el.textContent).toEqual(moment.unix(model.obj.value).toDate().toString());
    });
  });
});
