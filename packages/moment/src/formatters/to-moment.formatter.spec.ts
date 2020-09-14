import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { ToMomentFormatter } from './to-moment.formatter';
import { MomentInput } from 'moment';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(ToMomentFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: MomentInput;
  };
}

describe('riba.formatters', () => {

  describe('to-moment', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "toMoment" formatter should give the same value as the "moment()" function', () => {
      model.obj = {
        value: new Date(),
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | toMoment');
      riba.bind(el, model);
      expect(el.textContent).toEqual(moment(model.obj.value));
    });
  });
});
