import { Riba } from "../riba.js";

import { DisabledBinder } from "./disabled.binder.js";

import { dotAdapter } from "../adapters/dot.adapter.js";

import { Adapters } from "../types/index.js";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(DisabledBinder);

describe("riba.binders", () => {
  let button: HTMLButtonElement;

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

    button = document.createElement("button");
    document.body.appendChild(button);
  });

  afterEach(() => {
    if (!button.parentNode) {
      throw new Error("button.parentNode is not defined!");
    }
    button.parentNode.removeChild(button);
  });

  describe("disabled", () => {
    describe("with a truthy value", () => {
      it("disables the element", () => {
        button.setAttribute("rv-disabled", "true");
        const disabledBinder = riba.bind(button).bindings[0] as DisabledBinder;
        disabledBinder.routine(button, true);
        expect(button.disabled).toEqual(true);
      });
    });

    describe("with a falsey value", () => {
      it("enables the element", () => {
        button.setAttribute("rv-disabled", "true");
        const disabledBinder = riba.bind(button).bindings[0] as DisabledBinder;
        disabledBinder.routine(button, false);
        expect(button.disabled).toEqual(false);
      });
    });
  });
});
