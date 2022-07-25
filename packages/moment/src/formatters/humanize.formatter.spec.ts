import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { HumanizeFormatter } from "./humanize.formatter.js";
import { Duration, duration } from 'moment';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(HumanizeFormatter);
riba.module.binder.regist(TextBinder);

interface Model {
  obj?: {
    value: Duration;
  };
}

describe('riba.formatters', () => {

  describe('humanize', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The "humanize" formatter should give the same value as the "duration.humanize" method', () => {
      model.obj = {
        value: duration(133337, 'seconds'),
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | humanize');
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.obj.value.humanize());
    });
  });
});
