import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { DaysFormatter } from './days.formatter';
import { Moment, Duration, duration } from 'moment';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(DaysFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    moment: Moment;
    duration: Duration;
  };
}

describe('riba.formatters', () => {

  describe('days', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "days" formatter should give the same values as the "duration.days" or "moment.days" methods', () => {
      model.obj = {
        moment: moment(),
        duration: duration(13337, 'seconds'),
      };
      const el = document.createElement('div');
      const elMoment = document.createElement('div');
      const elDuration = document.createElement('div');
      elMoment.setAttribute('rv-text', 'obj.moment | days');
      elDuration.setAttribute('rv-text', 'obj.duration | days');
      el.appendChild(elMoment);
      el.appendChild(elDuration);
      riba.bind(el, model);
      expect(elMoment.textContent).toEqual(model.obj.moment.days().toString());
      expect(elDuration.textContent).toEqual(model.obj.duration.days().toString());
    });
  });
});
