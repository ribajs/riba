import { Riba } from "../riba.js";

import { AddClassBinder } from "./add-class.binder.js";

import { dotAdapter } from "../adapters/dot.adapter.js";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(AddClassBinder);

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
        add: "add-me",
      },
    };
  });

  describe("add-class", () => {
    it("Adds a class by a value string in the model", () => {
      element.className = "foobar";
      element.setAttribute("rv-add-class", "class.add");

      expect(element.className).toEqual("foobar");

      riba.bind(fragment, model);

      expect(element.className).toEqual("foobar add-me");

      model.class.add = "add-me-too";

      // Do not add both new classes (only the last bound one)
      expect(element.className).toEqual("foobar add-me-too");
    });
  });
});
