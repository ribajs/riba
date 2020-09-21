import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { AsHoursFormatter } from './as-hours.formatter';
import { duration, Duration } from "moment";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(AsHoursFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  duration: Duration,
}

describe('riba.formatters', () => {

  describe('asHours', () => {
    let model: Model = { duration: duration(13337, 'seconds') };

    it('The "asHours" formatter should give the same value as the "duration.asHours" method', () => {
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'duration | asHours');
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.duration.asHours().toString());
    });
  });
});
