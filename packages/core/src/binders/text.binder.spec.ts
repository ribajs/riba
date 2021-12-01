import { Riba } from "../riba";

import { textBinder } from "./text.binder";

import { dotAdapter } from "../adapters/dot.adapter";

import { Adapters } from "../types";

describe("riba.binders", () => {
  let el: HTMLUnknownElement;

  const riba = new Riba();
  riba.module.adapter.regist(dotAdapter);
  riba.module.binder.regist(textBinder);

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
      (riba.bindersDeprecated.text as any).routine(el, "<em>hello</em>");
      expect(el.textContent).toEqual("<em>hello</em>");
      expect(el.innerHTML).toEqual("&lt;em&gt;hello&lt;/em&gt;");
    });

    it("sets the element's text content to zero when a numeric zero is passed", () => {
      (riba.bindersDeprecated.text as any).routine(el, 0);
      expect(el.textContent).toEqual("0");
      expect(el.innerHTML).toEqual("0");
    });
  });
});
