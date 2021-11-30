import { Riba } from "../riba";

import { hideBinder } from "./hide.binder";

import { dotAdapter } from "../adapters/dot.adapter";

import { Adapters } from "../types";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binderDeprecated.regist(hideBinder);

describe("riba.binders", () => {
  let el: HTMLUnknownElement;

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

  describe("hide", () => {
    describe("with a truthy value", () => {
      it("hides the element", () => {
        (riba.binders.hide as any).routine(el, true);
        expect(el.style.display).toEqual("none");
      });
    });

    describe("with a falsey value", () => {
      it("shows the element", () => {
        (riba.binders.hide as any).routine(el, false);
        expect(el.style.display).toEqual("");
      });
    });
  });
});
