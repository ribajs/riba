import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { AsDaysFormatter } from './as-days.formatter';
import { duration, Duration } from "moment";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(AsDaysFormatter);
riba.module.binder.regist(textBinder);

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
