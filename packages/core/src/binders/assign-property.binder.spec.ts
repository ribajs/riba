import { Riba } from "../riba.js";
import { dotAdapter } from "../adapters/dot.adapter.js";
import { AssignPropertyBinder } from "./assign-property.binder.js";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(AssignPropertyBinder);

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
    };
  });

  describe("assign-*", () => {
    it("Set's a value to the model given as a value and property name", () => {
      element.setAttribute("rv-assign-new", '"hello"');

      expect(model).toEqual({ value: "world" });

      riba.bind(fragment, model);

      expect(model).toEqual({
        $root: {}, // Added on riba.bind
        value: "world",
        new: "hello"
      });
    });
  });
});
