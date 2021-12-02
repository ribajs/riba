import { Riba } from "../riba";

import { AttributeBinder } from "./attribute.binder";

import { dotAdapter } from "../adapters/dot.adapter";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(AttributeBinder);

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
