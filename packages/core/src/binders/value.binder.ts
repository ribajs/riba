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
      this.customData.event =
        el.getAttribute("event-name") ||
        (el.tagName === "SELECT" ? "change" : "input");
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      if (!this.customData.onChange) {
        this.customData.onChange = () => {
          self.publish();
        };
      }

      el.addEventListener("change", this.customData.onChange, false);
      el.addEventListener("input", this.customData.onChange, false);
      el.addEventListener("keyup", this.customData.onChange, false);
      el.addEventListener("paste", this.customData.onChange, false);
      el.addEventListener("blur", this.customData.onChange, false);
      el.addEventListener("focus", this.customData.onChange, false);
    }
  },

  unbind(el: HTMLUnknownElement) {
    el.removeEventListener("change", this.customData.onChange);
    el.removeEventListener("input", this.customData.onChange);
    el.removeEventListener("keyup", this.customData.onChange);
    el.removeEventListener("paste", this.customData.onChange);
    el.removeEventListener("blur", this.customData.onChange);
    el.removeEventListener("focus", this.customData.onChange);
  },

  routine(el: HTMLElement | HTMLSelectElement, value: string | string[]) {
    const oldValue = this.getValue(el);
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
          // TODO check if the value was really changed
          el.dispatchEvent(new Event("change"));
        }
      } else if (el.getAttribute("contenteditable")) {
        if (getString(value as string) !== oldValue) {
          el.innerHTML = value as string; // TODO write test for contenteditable
          el.dispatchEvent(new Event("change"));
        }
      } else {
        if (getString(value as string) !== oldValue) {
          (el as HTMLInputElement).value =
            value != null ? (value as string) : "";
          el.dispatchEvent(new Event("change"));
        }
      }
    }
  },

  getValue: getInputValue,
};
