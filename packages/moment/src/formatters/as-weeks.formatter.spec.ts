import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { AsWeeksFormatter } from "./as-weeks.formatter.js";
import { duration, Duration } from "moment";

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(AsWeeksFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  duration: Duration,
}

describe('riba.formatters', () => {

  describe('asWeeks', () => {
    let model: Model = { duration: duration(13337, 'seconds') };

    it('The "asWeeks" formatter should give the same value as the "duration.asWeeks" method', () => {
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'duration | asWeeks');
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.duration.asWeeks().toString());
    });
  });
});
