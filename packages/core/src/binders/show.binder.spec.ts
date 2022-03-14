import { Riba } from "../riba.js";
import { dotAdapter } from "../adapters/dot.adapter.js";
import { ShowBinder } from "./show.binder.js";
import { Adapters } from "../types/index.js";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(ShowBinder);

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
    el.setAttribute("rv-show", "true");
    document.body.appendChild(el);
  });

  afterEach(() => {
    if (!el.parentNode) {
      throw new Error("el.parentNode is not defined!");
    }
    el.parentNode.removeChild(el);
  });

  describe("show", () => {
    describe("with a truthy value", () => {
      it("shows the element", () => {
        const view = riba.bind(el);
        const showBinder = view.bindings[0] as ShowBinder;
        showBinder.routine(el, true);
        expect(el.style.display).toEqual("");
      });
    });

    describe("with a falsey value", () => {
      it("hides the element", () => {
        const view = riba.bind(el);
        const showBinder = view.bindings[0] as ShowBinder;
        showBinder.routine(el, false);
        expect(el.style.display).toEqual("none");
      });
    });
  });
});
