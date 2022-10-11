import { Riba } from "../riba.js";
import { TextBinder } from "./text.binder.js";
import { dotAdapter } from "../adapters/dot.adapter.js";
import { Adapters } from "../types/index.js";

describe("riba.binders", () => {
  let el: HTMLUnknownElement;

  const riba = new Riba();
  riba.module.adapter.register(dotAdapter);
  riba.module.binder.register(TextBinder);

  beforeEach(() => {
    riba.configure({
      adapters: ({
        subscribe: () => {
          /**/
        },
        unsubscribe: () => {
          /**/
        },
        read: () => {
          /**/
        },
        publish: () => {
          /**/
        },
      } as unknown) as Adapters,
    });

    el = document.createElement("div");
    el.setAttribute("rv-text", "");
    document.body.appendChild(el);
  });

  afterEach(() => {
    if (!el.parentNode) {
      throw new Error("el.parentNode is not defined!");
    }
    el.parentNode.removeChild(el);
  });

  describe("text", () => {
    it("sets the element's text content", () => {
      const view = riba.bind(el);
      const textBinder = view.bindings[0] as TextBinder;
      textBinder.routine(el, "<em>hello</em>");
      expect(el.textContent).toEqual("<em>hello</em>");
      expect(el.innerHTML).toEqual("&lt;em&gt;hello&lt;/em&gt;");
    });

    it("sets the element's text content to zero when a numeric zero is passed", () => {
      const view = riba.bind(el);
      const textBinder = view.bindings[0] as TextBinder;
      textBinder.routine(el, 0);
      expect(el.textContent).toEqual("0");
      expect(el.innerHTML).toEqual("0");
    });
  });
});
