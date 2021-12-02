import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { WeeksFormatter } from './weeks.formatter';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(WeeksFormatter);
riba.module.binder.regist(TextBinder);

interface Model {
  obj?: {
    moment: moment.Moment;
    duration: moment.Duration;
  };
}

describe('riba.formatters', () => {

  describe('weeks', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "weeks" formatter should give the same values as the "moment.weeks" or "duration.weeks" methods', () => {
      model.obj = {
        moment: moment(),
        duration: moment.duration(13337, 'seconds'),
      };
      const el = document.createElement('div');
      const elMoment = document.createElement('div');
      const elDuration = document.createElement('div');
      elMoment.setAttribute('rv-text', 'obj.moment | weeks');
      elDuration.setAttribute('rv-text', 'obj.duration | weeks');
      el.appendChild(elMoment);
      el.appendChild(elDuration);
      riba.bind(el, model);
      expect(elMoment.textContent).toEqual(model.obj.moment.weeks().toString());
      expect(elDuration.textContent).toEqual(model.obj.duration.weeks().toString());
    });
  });
});
