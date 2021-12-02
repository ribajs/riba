import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { AsMonthsFormatter } from './as-months.formatter';
import { duration, Duration } from "moment";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(AsMonthsFormatter);
riba.module.binder.regist(TextBinder);

interface Model {
  duration: Duration,
}

describe('riba.formatters', () => {

  describe('asMonths', () => {
    let model: Model = { duration: duration(13337, 'seconds') };

    it('The "asMonths" formatter should give the same value as the "duration.asMonths" method', () => {
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'duration | asMonths');
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.duration.asMonths().toString());
    });
  });
});
