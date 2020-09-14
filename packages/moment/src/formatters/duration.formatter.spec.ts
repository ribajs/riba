import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { DurationFormatter } from './duration.formatter';
import { MomentInput } from 'moment';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(DurationFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    startAt: MomentInput;
    endAt: MomentInput;
  };
}

describe('riba.formatters', () => {

  describe('duration', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "duration" formatter should give the same value as the "moment.diff" method', () => {
      model.obj = {
        startAt: new Date(),
        endAt: new Date(),
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'startAt | duration endAt');
      riba.bind(el, model);
      expect(el.textContent).toEqual(moment.duration(moment(model.obj.endAt).diff(model.obj.startAt)));
    });
  });
});
