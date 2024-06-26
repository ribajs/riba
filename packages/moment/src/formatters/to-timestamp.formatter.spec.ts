import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { ToTimestampFormatter } from './to-timestamp.formatter.js';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(ToTimestampFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  obj?: {
    value: moment.Moment;
  };
}

describe('riba.formatters', () => {

  describe('to-timestamp', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "toTimestamp" formatter should give the same value as the "moment.format(\'X\')" method', () => {
      model.obj = {
        value: moment(),
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | toTimestamp');
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.obj.value.format('X'));
    });
  });
});
