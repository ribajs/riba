import { Riba } from "../riba.js";

import { AttributeBinder } from "./attribute.binder.js";

import { dotAdapter } from "../adapters/dot.adapter.js";

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.binder.register(AttributeBinder);

describe("riba.binders", () => {
  let element: HTMLDivElement;
  let fragment: DocumentFragment;
  let model: any = {};

  beforeEach(() => {
    fragment = document.createDocumentFragment();
    element = document.createElement("div");
    fragment.appendChild(element);

    model = {
      barString: "bar",
    };
  });

  describe("*", () => {
    it("Adds or removes the class name passed as star parameter", () => {
      element.className = "foobar";
      element.setAttribute("rv-foo", "barString");

      expect(element.getAttribute("foo")).toEqual(null);

      riba.bind(fragment, model);

      expect(element.getAttribute("foo")).toEqual("bar");
    });
  });
});
