import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { AsMillisecondsFormatter } from "./as-milliseconds.formatter.js";
import { duration, Duration } from "moment";

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(AsMillisecondsFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  duration: Duration,
}

describe('riba.formatters', () => {

  describe('asMilliseconds', () => {
    let model: Model = { duration: duration(13337, 'seconds') };

    it('The "asMilliseconds" formatter should give the same value as the "duration.asMilliseconds" method', () => {
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'duration | asMilliseconds');
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.duration.asMilliseconds().toString());
    });
  });
});
