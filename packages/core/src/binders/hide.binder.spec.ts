import { Riba } from "../riba.js";
import { HideBinder } from "./hide.binder.js";
import { dotAdapter } from "../adapters/dot.adapter.js";
import { Adapters } from "../types/index.js";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(HideBinder);

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
    el.setAttribute("rv-hide", "false");
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
        const view = riba.bind(el);
        const hideBinder = view.bindings[0] as HideBinder;
        hideBinder.routine(el, true);
        expect(el.style.display).toEqual("none");
      });
    });

    describe("with a falsey value", () => {
      it("shows the element", () => {
        const view = riba.bind(el);
        const hideBinder = view.bindings[0] as HideBinder;
        hideBinder.routine(el, false);
        expect(el.style.display).toEqual("");
      });
    });
  });
});
