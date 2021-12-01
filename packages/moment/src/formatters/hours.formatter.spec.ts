import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { HoursFormatter } from './hours.formatter';
import { Moment, Duration, duration } from 'moment';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(HoursFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    moment: Moment;
    duration: Duration;
  };
}

describe('riba.formatters', () => {

  describe('hours', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "hours" formatter should give the same values as the "moment.hours" and "duration.hours" methods', () => {
      model.obj = {
        moment: moment(),
        duration: duration(13337, 'seconds'),
      };
      const el = document.createElement('div');
      const elMoment = document.createElement('div');
      const elDuration = document.createElement('div');
      elMoment.setAttribute('rv-text', 'obj.moment | hours');
      elDuration.setAttribute('rv-text', 'obj.duration | hours');
      el.appendChild(elMoment);
      el.appendChild(elDuration);
      riba.bind(el, model);
      expect(elMoment.textContent).toEqual(model.obj.moment.hours().toString());
      expect(elDuration.textContent).toEqual(model.obj.duration.hours().toString());
    });
  });
});
