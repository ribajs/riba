import { Riba } from "../riba.js";

import { EnabledBinder } from "./enabled.binder.js";

import { dotAdapter } from "../adapters/dot.adapter.js";

import { Adapters } from "../types/index.js";

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.binder.register(EnabledBinder);

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

  describe("enabled", () => {
    describe("with a truthy value", () => {
      it("enables the element", () => {
        button.setAttribute("rv-enabled", "true");
        const enabledBinder = riba.bind(button).bindings[0] as EnabledBinder;
        enabledBinder.routine(button, true);
        expect(button.disabled).toEqual(false);
      });
    });

    describe("with a falsey value", () => {
      it("disables the element", () => {
        button.setAttribute("rv-enabled", "true");
        const enabledBinder = riba.bind(button).bindings[0] as EnabledBinder;
        enabledBinder.routine(button, false);
        expect(button.disabled).toEqual(true);
      });
    });
  });
});
