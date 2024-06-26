import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { MonthsFormatter } from "./months.formatter.js";
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(MonthsFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  obj?: {
    moment: moment.Moment;
    duration: moment.Duration;
  };
}

describe('riba.formatters', () => {

  describe('months', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "months" formatter should give the same values as the "moment.months" and "duration.months" methods', () => {
      model.obj = {
        moment: moment(),
        duration: moment.duration(13337, 'seconds'),
      };
      const el = document.createElement('div');
      const elMoment = document.createElement('div');
      const elDuration = document.createElement('div');
      elMoment.setAttribute('rv-text', 'obj.moment | months');
      elDuration.setAttribute('rv-text', 'obj.duration | months');
      el.appendChild(elMoment);
      el.appendChild(elDuration);
      riba.bind(el, model);
      expect(elMoment.textContent).toEqual(model.obj.moment.month().toString());
      expect(elDuration.textContent).toEqual(model.obj.duration.months().toString());
    });
  });
});
