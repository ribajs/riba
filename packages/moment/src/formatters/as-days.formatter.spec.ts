import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { AsDaysFormatter } from "./as-days.formatter.js";
import { duration, Duration } from "moment";

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(AsDaysFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  duration: Duration,
}

describe('riba.formatters', () => {

  describe('asDays', () => {
    let model: Model = { duration: duration(13337, 'seconds') };

    it('The "asDays" formatter should give the same value as the "duration.asDays" method', () => {
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'duration | asDays');
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.duration.asDays().toString());
    });
  });
});
