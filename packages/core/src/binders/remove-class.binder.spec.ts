import { Riba } from "../riba.js";

import { dotAdapter } from "../adapters/dot.adapter.js";

import { RemoveClassBinder } from "./remove-class.binder.js";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(RemoveClassBinder);

describe("riba.binders", () => {
  let element: HTMLDivElement;
  let fragment: DocumentFragment;
  let model: any = {};

  beforeEach(() => {
    fragment = document.createDocumentFragment();
    element = document.createElement("div");
    fragment.appendChild(element);

    model = {
      class: {
        remove: "remove-me",
      },
    };
  });

  describe("remove-class", () => {
    it("Removes a class by a value string in the model", () => {
      element.className = "foobar remove-me";
      element.setAttribute("rv-remove-class", "class.remove");

      expect(element.className).toEqual("foobar remove-me");

      riba.bind(fragment, model);

      expect(element.className).toEqual("foobar");

      model.class.remove = "foobar";

      // Do not remove both inital classes (only the last bound one)
      expect(element.className).toEqual("remove-me");
    });
  });
});
