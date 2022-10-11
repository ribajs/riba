import { Riba } from "../../riba.js";

import { dotAdapter } from "../../adapters/dot.adapter.js";

import { plusFormatter } from "./plus.formatter.js";
import { TextBinder } from "../../binders/text.binder.js";

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.register(plusFormatter);
riba.module.binder.register(TextBinder);

interface Model {
  obj?: {
    value: number;
  };
}

describe("riba.formatters", () => {
  describe("plus", () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it("A number should be added to the value of the model correctly", () => {
      model.obj = {
        value: 100,
      };
      const el = document.createElement("div");
      el.setAttribute("rv-text", "obj.value | plus 200");
      riba.bind(el, model);
      expect(el.textContent).toEqual("300");
    });
  });
});
