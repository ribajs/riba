import { Riba } from "../riba.js";

import { AssignBinder } from "./assign.binder.js";

import { dotAdapter } from "../adapters/dot.adapter.js";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(AssignBinder);

describe("riba.binders", () => {
  let element: HTMLDivElement;
  let fragment: DocumentFragment;
  let model: any = {};

  beforeEach(() => {
    fragment = document.createDocumentFragment();
    element = document.createElement("div");
    fragment.appendChild(element);

    model = {
      value: "world",
      setMeToValue: {
        value: "hey man!",
      },
    };
  });

  describe("assign", () => {
    it("Set's a value to the model given as json string", () => {
      element.setAttribute("rv-assign", '{"newValue": "hello"}');

      expect(model).toEqual({
        value: "world",
        setMeToValue: { value: "hey man!" },
      });

      riba.bind(fragment, model);

      expect(model).toEqual({
        value: "world",
        newValue: "hello",
        setMeToValue: { value: "hey man!" },
      });
    });

    it("Overwrites a value to the model given as keypath", () => {
      element.setAttribute("rv-assign", "setMeToValue");

      expect(model).toEqual({
        value: "world",
        setMeToValue: { value: "hey man!" },
      });

      riba.bind(fragment, model);

      expect(model.value).toEqual("hey man!");
    });
  });
});
