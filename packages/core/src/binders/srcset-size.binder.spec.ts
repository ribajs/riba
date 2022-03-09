import { Riba } from "../riba.js";

import { dotAdapter } from "../adapters/dot.adapter.js";

import { SrcsetSizeBinder } from "./srcset-size.binder.js";

describe("riba.binders", () => {
  let el: HTMLDivElement;
  let fragment: DocumentFragment;
  let model: any = {};

  const riba = new Riba();
  riba.module.adapter.regist(dotAdapter);
  riba.module.binder.regist(SrcsetSizeBinder);

  beforeEach(() => {
    fragment = document.createDocumentFragment();
    el = document.createElement("div");
    fragment.appendChild(el);
    model = {
      small: "//placehold.it/100x",
      middle: "//placehold.it/200x",
      big: "//placehold.it/300x",
    };
  });

  afterEach(() => {
    if (!el.parentNode) {
      throw new Error("el.parentNode is not defined!");
    }
    el.parentNode.removeChild(el);
  });

  describe("srcset-size", () => {
    it("Adds a url + size string to the srcset attribute by a value string in the model", () => {
      // tslint:disable:quotemark
      el.setAttribute("rv-srcset-100w", "small");
      el.setAttribute("rv-srcset-200w", "middle");
      el.setAttribute("rv-srcset-300w", "big");

      riba.bind(fragment, model);

      expect(el.getAttribute("srcset")).toEqual(
        "//placehold.it/100x 100w, //placehold.it/200x 200w, //placehold.it/300x 300w"
      );

      // Removes url for size
      model.middle = "";

      expect(el.getAttribute("srcset")).toEqual(
        "//placehold.it/100x 100w, //placehold.it/300x 300w"
      );
    });
  });
});
