import { Riba, textBinder, dotAdapter } from '@ribajs/core';
import { AsSecondsFormatter } from './as-seconds.formatter';
import { duration, Duration } from "moment";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(AsSecondsFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  duration: Duration,
}

describe('riba.formatters', () => {

  describe('asSeconds', () => {
    let model: Model = { duration: duration(13337, 'seconds') };

    it('The "asSeconds" formatter should give the same value as the "duration.asSeconds" method', () => {
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'duration | asSeconds');
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.duration.asSeconds().toString());
    });
  });
});
