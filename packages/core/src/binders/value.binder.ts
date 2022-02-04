import { Binder } from "../binder";
import { getInputValue, getString, setAttribute } from "@ribajs/utils";

const DEFAULT_EVENTS = "change input paste blur focus";

/**
 * Sets the element's value. Also sets the model property when the input changes
 * (two-way binder).
 */
export class ValueBinder extends Binder<any, HTMLElement> {
  static key = "value";
  publishes = true;
  priority = 3000;

  event?: string;

  getData(el: HTMLElement) {
    const data = {
      type: (el as HTMLInputElement).type,
      tagName: el.tagName,
      contenteditable: el.getAttribute("contenteditable") ? true : false,
      isRadio: false,
      isOption: false,
    };
    data.isRadio = data.tagName === "INPUT" && data.type === "radio";
    data.isOption = data.tagName === "OPTION";
    return data;
  }

  onChange = this.publish.bind(this);

  bind(el: HTMLElement) {
    if (el.tagName === "OPTION") {
      return;
    }
    const data = this.getData(el);
    if (!data.isRadio) {
      this.event = el.getAttribute("event-name") || DEFAULT_EVENTS;

      const events = this.event.split(" ");
      for (const event of events) {
        el.addEventListener(event.trim(), this.onChange, false);
      }
    }
  }

  unbind(el: HTMLUnknownElement) {
    if (this.event) {
      const events = this.event.split(" ");
      for (const event in events) {
        el.removeEventListener(event.trim(), this.onChange);
      }
    }
  }

  routine(
    el: HTMLElement | HTMLSelectElement,
    newValue?: number | string | string[]
  ) {
    let oldValue = this.getValue(el);

    if (!Array.isArray(newValue)) {
      if (newValue != null) {
        newValue = getString(newValue);
      } else {
        newValue = "";
      }
    }
    if (!Array.isArray(oldValue)) {
      if (oldValue != null) {
        oldValue = getString(oldValue);
      } else {
        oldValue = "";
      }
    }

    if (oldValue === newValue) {
      // nothing changed
      return;
    }

    const data = this.getData(el);

    if (data.isRadio || data.isOption) {
      return setAttribute(el, "value", newValue);
    }

    if ((el as HTMLSelectElement).type === "select-multiple") {
      if (Array.isArray(newValue)) {
        for (let i = 0; i < (el as HTMLSelectElement).options.length; i++) {
          const option = (el as HTMLSelectElement).options[
            i
          ] as HTMLOptionElement;
          option.selected = newValue.indexOf(option.value) > -1;
        }
      }
    } else if (el.getAttribute("contenteditable")) {
      el.innerHTML = newValue as string; // TODO write test for contenteditable
    } else {
      (el as HTMLInputElement).value = newValue as string;
    }
  }

  getValue(el: HTMLElement) {
    return getInputValue(el);
  }
}
