import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { AsMinutesFormatter } from "./as-minutes.formatter.js";
import { duration, Duration } from "moment";

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(AsMinutesFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  duration: Duration,
}

describe('riba.formatters', () => {

  describe('asMinutes', () => {
    let model: Model = { duration: duration(13337, 'seconds') };

    it('The "asMinutes" formatter should give the same value as the "duration.asMinutes" method', () => {
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'duration | asMinutes');
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.duration.asMinutes().toString());
    });
  });
});
