import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { ToDateFormatter } from './to-date.formatter';
import { Moment } from 'moment';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(ToDateFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  timestamp: number;
  moment: Moment;
}

describe('riba.formatters', () => {

  describe('toDate', () => {
    let model: Model = {
      timestamp: Date.now(),
      moment: moment(),
    };

    it('The "toDate" formatter should give the same value as the "moment.unix(...).toDate()" method for timestamps, or "moment.toDate" method for moment objects.', () => {
      const el = document.createElement('div');
      const elTimestamp = document.createElement('div');
      const elMoment = document.createElement('div');
      elTimestamp.setAttribute('rv-text', 'timestamp | toDate');
      elMoment.setAttribute('rv-text', 'moment | toDate');
      el.appendChild(elTimestamp);
      el.appendChild(elMoment);
      riba.bind(el, model);
      expect(elTimestamp.textContent).toEqual(moment.unix(model.timestamp).toDate().toString());
      expect(elMoment.textContent).toEqual(model.moment.toDate().toString());
    });
  });
});
