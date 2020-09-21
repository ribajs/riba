import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { SecondsFormatter } from './seconds.formatter';
import { Moment, Duration, duration } from 'moment';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(SecondsFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    moment: Moment;
    duration: Duration;
  };
}

describe('riba.formatters', () => {

  describe('seconds', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "seconds" formatter should give the same values as the "moment.seconds" and "duration.seconds" methods', () => {
      model.obj = {
        moment: moment(),
        duration: duration(13337, 'seconds'),
      };
      const el = document.createElement('div');
      const elMoment = document.createElement('div');
      const elDuration = document.createElement('div');
      elMoment.setAttribute('rv-text', 'obj.moment | seconds');
      elDuration.setAttribute('rv-text', 'obj.duration | seconds');
      el.appendChild(elMoment);
      el.appendChild(elDuration);
      riba.bind(el, model);
      expect(elMoment.textContent).toEqual(model.obj.moment.seconds().toString());
      expect(elDuration.textContent).toEqual(model.obj.duration.seconds().toString());
    });
  });
});
