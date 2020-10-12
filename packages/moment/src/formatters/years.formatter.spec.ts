import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { YearsFormatter } from './years.formatter';
import { Moment, Duration, duration } from 'moment';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(YearsFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    moment: Moment;
    duration: Duration;
  };
}

describe('riba.formatters', () => {

  describe('years', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "years" formatter should give the same value as the "moment.years" or "duration.years" methods', () => {
      model.obj = {
        moment: moment(),
        duration: duration(13337, 'seconds'),
      };
      const el = document.createElement('div');
      const elMoment = document.createElement('div');
      const elDuration = document.createElement('div');
      elMoment.setAttribute('rv-text', 'obj.moment | years');
      elDuration.setAttribute('rv-text', 'obj.duration | years');
      el.appendChild(elMoment);
      el.appendChild(elDuration);
      riba.bind(el, model);
      expect(elMoment.textContent).toEqual(model.obj.moment.year().toString());
      expect(elDuration.textContent).toEqual(model.obj.duration.years().toString());
    });
  });
});
