import { Riba, TextBinder, dotAdapter } from '@ribajs/core';
import { DateFormatFormatter } from "./date-format.formatter.js";
import { Moment } from 'moment';
import moment from 'moment';

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(DateFormatFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  now: Moment,
}

describe('riba.formatters', () => {

  describe('date-format', () => {
    const model: Model = {
      now: moment(),
    };
    it('The "dateFormat" formatter should give the same value as the "moment.format" method', () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "now | dateFormat 'dddd, MMMM Do YYYY, h:mm:ss a'");
      riba.bind(el, model);
      expect(el.textContent).toEqual(model.now.format("dddd, MMMM Do YYYY, h:mm:ss a"));
    });
  });
});
