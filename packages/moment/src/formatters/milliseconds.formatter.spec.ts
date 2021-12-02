import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { MillisecondsFormatter } from './milliseconds.formatter';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(MillisecondsFormatter);
riba.module.binder.regist(TextBinder);

interface Model {
  obj?: {
    moment: moment.Moment;
    duration: moment.Duration;
  };
}

describe('riba.formatters', () => {

  describe('milliseconds', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "milliseconds" formatter should give the same values as the "moment.milliseconds" and "duration.milliseconds" methods', () => {
      model.obj = {
        moment: moment(),
        duration: moment.duration(13337, 'seconds'),
      };
      const el = document.createElement('div');
      const elMoment = document.createElement('div');
      const elDuration = document.createElement('div');
      elMoment.setAttribute('rv-text', 'obj.moment | milliseconds');
      elDuration.setAttribute('rv-text', 'obj.duration | milliseconds');
      el.appendChild(elMoment);
      el.appendChild(elDuration);
      riba.bind(el, model);
      expect(elMoment.textContent).toEqual(model.obj.moment.milliseconds().toString());
      expect(elDuration.textContent).toEqual(model.obj.duration.milliseconds().toString());
    });
  });
});
