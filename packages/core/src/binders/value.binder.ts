import { Binder } from "../interfaces";
import { getInputValue } from "@ribajs/utils/src/dom";
import { getString } from "@ribajs/utils/src/type";

const getData = (el: HTMLElement) => {
  const customData: any = {};
  customData.type = (el as HTMLInputElement).type;
  customData.tagName = el.tagName;
  customData.contenteditable = el.getAttribute("contenteditable")
    ? true
    : false;
  customData.isRadio =
    customData.tagName === "INPUT" && customData.type === "radio";
  return customData;
};

const DEFAULT_EVENTS = "change input paste blur focus";

/**
 * Sets the element's value. Also sets the model property when the input changes
 * (two-way binder).
 */
export const valueBinder: Binder<any> = {
  name: "value",
  publishes: true,
  priority: 3000,

  onChange() {
    this.publish();
  },

  bind(el: HTMLElement) {
    if (!this.customData) {
      this.customData = getData(el);
    }
    if (!this.customData.isRadio) {
      this.customData.event = el.getAttribute("event-name") || DEFAULT_EVENTS;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      if (!this.customData.onChange) {
        this.customData.onChange = () => {
          self.publish();
        };
      }

      const events = (this.customData.event as string).split(" ");
      for (const event of events) {
        el.addEventListener(event.trim(), this.customData.onChange, false);
      }
    }
  },

  unbind(el: HTMLUnknownElement) {
    const events = this.customData.event.split(" ");
    for (const event in events) {
      el.removeEventListener(event.trim(), this.customData.onChange);
    }
  },

  routine(el: HTMLElement | HTMLSelectElement, value?: string | string[]) {
    let oldValue = this.getValue(el);
    if (!Array.isArray(value)) {
      if (value != null) {
        value = getString(value);
      } else {
        value = "";
      }
    }
    if (!Array.isArray(oldValue)) {
      if (oldValue != null) {
        oldValue = getString(oldValue);
      } else {
        oldValue = "";
      }
    }
    if (oldValue === value) {
      // nothing changed
      return;
    }

    if (!this.customData) {
      this.customData = getData(el);
    }
    if (this.customData.isRadio) {
      el.setAttribute("value", value as string);
    } else {
      if ((el as HTMLSelectElement).type === "select-multiple") {
        if (Array.isArray(value)) {
          for (let i = 0; i < (el as HTMLSelectElement).options.length; i++) {
            const option = (el as HTMLSelectElement).options[
              i
            ] as HTMLOptionElement;
            option.selected = value.indexOf(option.value) > -1;
          }
        }
      } else if (el.getAttribute("contenteditable")) {
        el.innerHTML = value as string; // TODO write test for contenteditable
      } else {
        (el as HTMLInputElement).value = value as string;
      }
    }
  },

  getValue: getInputValue,
};
