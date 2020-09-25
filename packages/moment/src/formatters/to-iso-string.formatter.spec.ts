import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { ToISOStringFormatter } from './to-iso-string.formatter';
import { Moment } from 'moment';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(ToISOStringFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: Moment;
  };
}

describe('riba.formatters', () => {

  describe('toISOString', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "toISOString" formatter should give the same value as the "moment.toISOString" method', () => {
      model.obj = {
        value: moment(),
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | toISOString');
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.obj.value.toISOString());
    });
  });
});
