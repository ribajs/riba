import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { MonthsFormatter } from './months.formatter';
import { Moment, Duration, duration } from 'moment';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(MonthsFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    moment: Moment;
    duration: Duration;
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
        duration: duration(13337, 'seconds'),
      };
      const el = document.createElement('div');
      const elMoment = document.createElement('div');
      const elDuration = document.createElement('div');
      elMoment.setAttribute('rv-text', 'obj.moment | months');
      elDuration.setAttribute('rv-text', 'obj.duration | months');
      el.appendChild(elMoment);
      el.appendChild(elDuration);
      riba.bind(el, model);
      expect(elMoment.textContent).toEqual(model.obj.moment.months().toString());
      expect(elDuration.textContent).toEqual(model.obj.duration.months().toString());
    });
  });
});
