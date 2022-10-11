import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { SecondsFormatter } from "./seconds.formatter.js";
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(SecondsFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  obj?: {
    moment: moment.Moment;
    duration: moment.Duration;
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
        duration: moment.duration(13337, 'seconds'),
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
