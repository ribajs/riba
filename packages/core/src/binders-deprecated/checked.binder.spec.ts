import { Riba } from "../riba";

import { checkedBinder } from "./checked.binder";

import { dotAdapter } from "../adapters/dot.adapter";

import { Adapters } from "../types";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binderDeprecated.regist(checkedBinder);

describe("riba.binders", () => {
  let trueRadioInput: HTMLInputElement;
  let falseRadioInput: HTMLInputElement;
  let checkboxInput: HTMLInputElement;

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

  describe("checked", () => {
    describe("with a checkbox input", () => {
      describe("and a truthy value", () => {
        it("checks the checkbox input", () => {
          (riba.bindersDeprecated.checked as any).routine(checkboxInput, true);
          expect(checkboxInput.checked).toEqual(true);
        });
      });

      describe("with a falsey value", () => {
        it("unchecks the checkbox input", () => {
          (riba.bindersDeprecated.checked as any).routine(checkboxInput, false);
          expect(checkboxInput.checked).toEqual(false);
        });
      });
    });

    describe('with a radio input with value="true"', () => {
      describe("and a truthy value", () => {
        it("checks the radio input", () => {
          (riba.bindersDeprecated.checked as any).routine(trueRadioInput, true);
          expect(trueRadioInput.checked).toEqual(true);
        });
      });

      describe("with a falsey value", () => {
        it("unchecks the radio input", () => {
          (riba.bindersDeprecated.checked as any).routine(trueRadioInput, false);
          expect(trueRadioInput.checked).toEqual(false);
        });
      });
    });

    describe('with a radio input with value="false"', () => {
      describe("and a truthy value", () => {
        it("unchecks the radio input", () => {
          (riba.bindersDeprecated.checked as any).routine(falseRadioInput, true);
          expect(falseRadioInput.checked).toEqual(false);
        });
      });

      describe("with a falsey value", () => {
        it("checks the radio input", () => {
          (riba.bindersDeprecated.checked as any).routine(falseRadioInput, false);
          expect(falseRadioInput.checked).toEqual(true);
        });
      });
    });
  });
});
