import { Riba } from "../riba.js";
import { UncheckedBinder } from "./unchecked.binder.js";
import { dotAdapter } from "../adapters/dot.adapter.js";
import { Adapters } from "../types/index.js";

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.binder.register(UncheckedBinder);

describe("riba.binders", () => {
  let trueRadioInput: HTMLInputElement;
  let falseRadioInput: HTMLInputElement;
  let checkboxInput: HTMLInputElement;
  let checkboxInputWithBinder: HTMLInputElement;

  const createInputElement = (type: string, value?: string) => {
    const elem = document.createElement("input");
    elem.setAttribute("type", type);
    if (value !== undefined) {
      elem.setAttribute("value", value);
    }
    document.body.appendChild(elem);
    return elem;
  };

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

    // to test the radio input scenario when its value is 'true'
    trueRadioInput = createInputElement("radio", "true");

    // to test the radio input scenario when its value is 'false'
    falseRadioInput = createInputElement("radio", "false");

    // to test the checkbox input scenario
    checkboxInput = createInputElement("checkbox");

    checkboxInputWithBinder = createInputElement("checkbox");
    checkboxInputWithBinder.setAttribute("rv-unchecked", "true");
  });

  afterEach(() => {
    if (!trueRadioInput.parentNode) {
      throw new Error("trueRadioInput.parentNode is not defined!");
    }
    if (!falseRadioInput.parentNode) {
      throw new Error("falseRadioInput.parentNode is not defined!");
    }
    if (!checkboxInput.parentNode) {
      throw new Error("checkboxInput.parentNode is not defined!");
    }
    trueRadioInput.parentNode.removeChild(trueRadioInput);
    falseRadioInput.parentNode.removeChild(falseRadioInput);
    checkboxInput.parentNode.removeChild(checkboxInput);
  });

  describe("unchecked", () => {
    describe("with a checkbox input", () => {
      describe("and a truthy value", () => {
        it("checks the checkbox input", () => {
          const view = riba.bind(checkboxInputWithBinder);
          const uncheckedBinder = view.bindings[0] as UncheckedBinder;
          uncheckedBinder.routine(checkboxInput, true);
          expect(checkboxInput.checked).toEqual(false);
        });
      });

      describe("with a falsey value", () => {
        it("unchecks the checkbox input", () => {
          const view = riba.bind(checkboxInputWithBinder);
          const uncheckedBinder = view.bindings[0] as UncheckedBinder;
          uncheckedBinder.routine(checkboxInput, false);
          expect(checkboxInput.checked).toEqual(true);
        });
      });
    });

    describe('with a radio input with value="true"', () => {
      describe("and a truthy value", () => {
        it("checks the radio input", () => {
          const view = riba.bind(checkboxInputWithBinder);
          const uncheckedBinder = view.bindings[0] as UncheckedBinder;
          uncheckedBinder.routine(trueRadioInput, true);
          expect(trueRadioInput.checked).toEqual(false);
        });
      });

      describe("with a falsey value", () => {
        it("unchecks the radio input", () => {
          const view = riba.bind(checkboxInputWithBinder);
          const uncheckedBinder = view.bindings[0] as UncheckedBinder;
          uncheckedBinder.routine(trueRadioInput, false);
          expect(trueRadioInput.checked).toEqual(true);
        });
      });
    });

    describe('with a radio input with value="false"', () => {
      describe("and a truthy value", () => {
        it("checks the radio input", () => {
          const view = riba.bind(checkboxInputWithBinder);
          const uncheckedBinder = view.bindings[0] as UncheckedBinder;
          uncheckedBinder.routine(falseRadioInput, true);
          expect(falseRadioInput.checked).toEqual(true);
        });
      });

      describe("with a falsey value", () => {
        it("unchecks the radio input", () => {
          const view = riba.bind(checkboxInputWithBinder);
          const uncheckedBinder = view.bindings[0] as UncheckedBinder;
          uncheckedBinder.routine(falseRadioInput, false);
          expect(falseRadioInput.checked).toEqual(false);
        });
      });
    });
  });
});
