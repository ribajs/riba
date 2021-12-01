import { Riba } from "../riba";
import { htmlBinder } from "./html.binder";
import { dotAdapter } from "../adapters/dot.adapter";
import { Adapters } from "../types";

describe("riba.binders", () => {
  let el: HTMLUnknownElement;
  const riba = new Riba();
  riba.module.adapter.regist(dotAdapter);
  riba.module.binder.regist(htmlBinder);

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
      const htmlBinder = view.bindings[0] as htmlBinder;
      htmlBinder.routine(el, "<strong>hello</strong>");
      expect(el.textContent).toEqual("hello");
      expect(el.innerHTML).toEqual("<strong>hello</strong>");
    });

    it("sets the element's HTML content to zero when a zero value is passed", () => {
      const view = riba.bind(el);
      const htmlBinder = view.bindings[0] as htmlBinder;
      htmlBinder.routine(el, 0);
      expect(el.textContent).toEqual("0");
      expect(el.innerHTML).toEqual("0");
    });
  });
});
