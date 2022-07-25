import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { MinutesFormatter } from "./minutes.formatter.js";
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(MinutesFormatter);
riba.module.binder.regist(TextBinder);

interface Model {
  obj?: {
    moment: moment.Moment;
    duration: moment.Duration;
  };
}

describe('riba.formatters', () => {

  describe('minutes', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "minutes" formatter should give the same values as the "moment.minutes" and "duration.minutes" methods', () => {
      model.obj = {
        moment: moment(),
        duration: moment.duration(13337, 'seconds'),
      };
      const el = document.createElement('div');
      const elMoment = document.createElement('div');
      const elDuration = document.createElement('div');
      elMoment.setAttribute('rv-text', 'obj.moment | minutes');
      elDuration.setAttribute('rv-text', 'obj.duration | minutes');
      el.appendChild(elMoment);
      el.appendChild(elDuration);
      riba.bind(el, model);
      expect(elMoment.textContent).toEqual(model.obj.moment.minutes().toString());
      expect(elDuration.textContent).toEqual(model.obj.duration.minutes().toString());
    });
  });
});
