import { Riba, ValueBinder, dotAdapter } from "@ribajs/core";
import { OnEventBinder } from "./on-event.binder";

describe("riba.binders", () => {
  const riba = new Riba();
  riba.module.adapter.regist(dotAdapter);
  riba.module.binder.regists([OnEventBinder, ValueBinder]);

  let element: HTMLInputElement;
  let fragment: DocumentFragment;
  let model: any = {};

  const blurAll = () => {
    const tmp = document.createElement("input");
    fragment.appendChild(tmp);
    tmp.focus();
    fragment.removeChild(tmp);
  };

  beforeEach(() => {
    fragment = document.createDocumentFragment();
    element = document.createElement("input");
    element.setAttribute("type", "text");
    fragment.appendChild(element);

    model = {};
  });

  describe("on-*", () => {
    it("on-click: Watch's the click event", () => {
      element.className = "foobar remove-me";
      model.onClick = jest.fn();
      element.setAttribute("rv-on-click", "onClick");
      riba.bind(fragment, model);

      // Simulates the click
      element.click();
      expect(model.onClick).toHaveBeenCalled();
    });

    it("on-change: Watch's the change event", () => {
      element.className = "foobar remove-me";

      model.onChange = jest.fn();
      jest.spyOn(model, 'onChange');

      model.onFocus = jest.fn();
      jest.spyOn(model, 'onFocus');

      model.onFocusout = jest.fn();
      jest.spyOn(model, 'onFocusout');

      model.value = "test";
      element.setAttribute("rv-on-change", "onChange");
      element.setAttribute("rv-on-focus", "onFocus");
      element.setAttribute("rv-on-blur", "onFocusout");
      element.setAttribute("rv-value", "value");

      riba.bind(fragment, model);

      // Trigger the change event
      element.focus();
      element.dispatchEvent(new Event("focus"));
  
      model.value = "this should trigger the change event!";
      element.dispatchEvent(new Event("change"));
  
      blurAll(); // Focus out all focused elements
      element.dispatchEvent(new Event("blur"));
      
      expect(model.onChange).toHaveBeenCalled();
      expect(model.onFocus).toHaveBeenCalled();
      expect(model.onFocusout).toHaveBeenCalled();
    });
  });
});
