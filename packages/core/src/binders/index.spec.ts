import { Riba } from "../riba";
import { Binder } from "../binder";

/**
 * Sets the element's text value.
 */
export class CustomBinder extends Binder<string> {
  static key = "custom-binder";
  routine(el: HTMLElement, value: string) {
    el.innerHTML = "received " + value;
  }
};

describe("Custom binder with no attribute value", () => {
  const riba = new Riba();
  riba.module.binder.regist(CustomBinder);

  let el: HTMLDivElement;
  let model: any;
  let fragment: DocumentFragment;

  beforeEach(() => {
    model = {};
    fragment = document.createDocumentFragment();
    el = document.createElement("div");
    fragment.appendChild(el);
  });

  it("receives undefined when html attribute is not specified", () => {
    el.innerHTML = "<div rv-custom-binder></div>";
    riba.bind(fragment, model);
    expect(el.children[0].innerHTML).toEqual("received undefined");
  });
  it("receives undefined when html attribute is not specified", () => {
    el.innerHTML = '<div rv-custom-binder=""></div>';
    riba.bind(fragment, model);
    expect(el.children[0].innerHTML).toEqual("received undefined");
  });
});
