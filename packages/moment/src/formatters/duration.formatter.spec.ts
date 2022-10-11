import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { DurationFormatter } from "./duration.formatter.js";
import { MomentInput } from 'moment';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(DurationFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  startAt: MomentInput;
  endAt: MomentInput;
}

describe('riba.formatters', () => {

  describe('duration', () => {
    let model: Model = {
      startAt: new Date(),
      endAt: new Date(),
    };

    it('The "duration" formatter should give the same value as the "moment.diff" method', () => {
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'startAt | duration endAt');
      riba.bind(el, model);
      expect(el.textContent).toEqual(moment.duration(moment(model.endAt).diff(model.startAt)).toString());
    });
  });
});
