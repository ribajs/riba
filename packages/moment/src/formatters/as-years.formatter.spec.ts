import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { AsYearsFormatter } from "./as-years.formatter.js";
import { duration, Duration } from "moment";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(AsYearsFormatter);
riba.module.binder.regist(TextBinder);

interface Model {
  duration: Duration,
}

describe('riba.formatters', () => {

  describe('asYears', () => {
    let model: Model = { duration: duration(13337, 'seconds') };

    it('The "asYears" formatter should give the same value as the "duration.asYears" method', () => {
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'duration | asYears');
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.duration.asYears().toString());
    });
  });
});
