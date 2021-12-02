import { Riba } from "../riba";
import { AnimateStarBinder } from "./animate-classname.binder";
import { dotAdapter } from "../adapters/dot.adapter";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(AnimateStarBinder);

describe("riba.binders", () => {
  let element: HTMLDivElement;
  let fragment: DocumentFragment;
  let model: any = {};

  beforeEach(() => {
    fragment = document.createDocumentFragment();
    element = document.createElement("div");
    fragment.appendChild(element);

    model = {
      startAnimation: true,
    };
  });

  describe("animate-", () => {
    it("Adds a class by a value string in the model", () => {
      element.className = "foobar";
      element.setAttribute("rv-animate-jump", "startAnimation");

      expect(element.className).toEqual("foobar");

      riba.bind(fragment, model);

      expect(element.className).toEqual("foobar jump jump-start");

      model.startAnimation = false;
      expect(element.className).toEqual("foobar jump jump-done");

      model.startAnimation = true;
      expect(element.className).toEqual("foobar jump jump-start");

      model.startAnimation = false;
      expect(element.className).toEqual("foobar jump jump-done");
    });
  });
});
