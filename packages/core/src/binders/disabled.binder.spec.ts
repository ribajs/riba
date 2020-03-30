import { Riba } from "../riba";

import { disabledBinder } from "./disabled.binder";

import { dotAdapter } from "../adapters/dot.adapter";

import { Adapters } from "../interfaces";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(disabledBinder);

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
        (riba.binders.disabled as any).routine(button, true);
        expect(button.disabled).toEqual(true);
      });
    });

    describe("with a falsey value", () => {
      it("enables the element", () => {
        (riba.binders.disabled as any).routine(button, false);
        expect(button.disabled).toEqual(false);
      });
    });
  });
});
