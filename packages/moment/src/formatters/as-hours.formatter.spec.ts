import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { AsHoursFormatter } from "./as-hours.formatter.js";
import { duration, Duration } from "moment";

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(AsHoursFormatter);
riba.module.binder.register(TextBinder);

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
