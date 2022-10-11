import { Riba } from "../riba.js";
import { BlockBinder } from "./block.binder.js";
import { dotAdapter } from "../adapters/dot.adapter.js";

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.binder.register(BlockBinder);

describe("riba.binders", () => {
  let element: HTMLDivElement;
  let fragment: DocumentFragment;
  let model: any = {};

  beforeEach(() => {
    fragment = document.createDocumentFragment();
    element = document.createElement("div");
    fragment.appendChild(element);

    model = {
      value: "hello",
    };
  });

  describe("block", () => {
    it("Blocks the binding of the child elements", () => {
      element.setAttribute("rv-block", "");
      element.innerHTML = "{ value }";

      riba.bind(fragment, model);

      // 'hello' should not be seen because the binding is blocked
      expect(element.innerHTML).toEqual("{ value }");
    });
  });
});
