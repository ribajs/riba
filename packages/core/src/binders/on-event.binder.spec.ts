import { Riba } from "../riba";
import { dotAdapter } from "../adapters/dot.adapter";
import { onEventBinder } from "./on-event.binder";
import { valueBinder } from "../binders-deprecated/value.binder";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(onEventBinder);
riba.module.binderDeprecated.regist(valueBinder);

describe("riba.binders", () => {
  let element: HTMLInputElement;
  let model: any = {};

  const blurAll = () => {
    const tmp = document.createElement("input");
    document.body.appendChild(tmp);
    tmp.focus();
    document.body.removeChild(tmp);
  };

  beforeEach(() => {
    element = document.createElement("input");
    element.setAttribute("type", "text");
    document.body.appendChild(element);

    model = {};
  });

  describe("on-*", () => {
    it("on-click: Watch's the click event", () => {
      element.className = "foobar remove-me";
      model.onClick = jest.fn();
      element.setAttribute("rv-on-click", "onClick");
      riba.bind(document.body, model);

      // Simulates the click
      element.click();
      expect(model.onClick).toHaveBeenCalled();
    });

    it("on-change: Watch's the change event", () => {
      element.className = "foobar remove-me";
      model.onChange = jest.fn();
      model.onFocus = jest.fn();
      model.onFocusout = jest.fn();
      model.value = "test";
      element.setAttribute("rv-on-change", "onChange");
      element.setAttribute("rv-on-focus", "onFocus");
      element.setAttribute("rv-on-blur", "onFocusout");
      element.setAttribute("rv-value", "value");

      riba.bind(document.body, model);

      // Trigger the focus event
      element.focus();
      // Trigger the change event
      model.value = "this should trigger the change event!";
      // Focus out all focused elements
      blurAll();

      expect(model.onFocus).toHaveBeenCalled();
      expect(model.onFocusout).toHaveBeenCalled();
      // expect(model.onChange).toHaveBeenCalled(); TODO FIXME
    });
  });
});
