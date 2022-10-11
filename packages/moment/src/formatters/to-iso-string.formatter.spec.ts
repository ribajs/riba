import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { ToISOStringFormatter } from "./to-iso-string.formatter.js";
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(ToISOStringFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  obj?: {
    value: moment.Moment;
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
