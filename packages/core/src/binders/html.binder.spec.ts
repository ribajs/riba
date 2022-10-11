import { Riba } from "../riba.js";
import { HtmlBinder } from "./html.binder.js";
import { dotAdapter } from "../adapters/dot.adapter.js";
import { Adapters } from "../types/index.js";

describe("riba.binders", () => {
  let el: HTMLUnknownElement;
  const riba = new Riba();
  riba.module.adapter.register(dotAdapter);
  riba.module.binder.register(HtmlBinder);

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
    el.setAttribute('rv-html', "");
    document.body.appendChild(el);
  });

  afterEach(() => {
    if (!el.parentNode) {
      throw new Error("el.parentNode is not defined!");
    }
    el.parentNode.removeChild(el);
  });

  describe("html", () => {
    it("sets the element's HTML content", () => {
      const view = riba.bind(el);
      const htmlBinder = view.bindings[0] as HtmlBinder;
      htmlBinder.routine(el, "<strong>hello</strong>");
      expect(el.textContent).toEqual("hello");
      expect(el.innerHTML).toEqual("<strong>hello</strong>");
    });

    it("sets the element's HTML content to zero when a zero value is passed", () => {
      const view = riba.bind(el);
      const htmlBinder = view.bindings[0] as HtmlBinder;
      htmlBinder.routine(el, 0);
      expect(el.textContent).toEqual("0");
      expect(el.innerHTML).toEqual("0");
    });
  });
});
