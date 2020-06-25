import { Binder } from "../interfaces";
import { getInputValue } from "@ribajs/utils/src/dom";
import { getString } from "@ribajs/utils/src/type";

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

  setCustomData(el: HTMLElement) {
    if (this.customData.tagName) {
      return;
    }

    this.customData = {};
    this.customData.publshInitalRoutine = true;
    this.customData.type = (el as HTMLInputElement).type;
    this.customData.tagName = el.tagName;
    this.customData.contenteditable = el.getAttribute("contenteditable")
      ? true
      : false;
    this.customData.isRadio =
      this.customData.tagName === "INPUT" && this.customData.type === "radio";
    this.customData.selectMultiple =
      (el as HTMLSelectElement).type === "select-multiple";

    // TODO checkme
    if (this.customData.isRadio) {
      this.customData.changeEvents = "change input keyup paste blur focus";
    } else {
      this.customData.changeEvents =
        el.getAttribute("event-name") ||
        (el.tagName === "SELECT" ? "change" : "input");
    }
  },

  bind(el: HTMLElement) {
    this.binder.setCustomData.call(this, el);
    if (!this.customData.isRadio) {
      el.addEventListener(
        this.customData.changeEvents,
        this.binder.onChange.bind(this)
      );
    }
  },

  unbind(el: HTMLUnknownElement) {
    el.removeEventListener(
      this.customData.changeEvents,
      this.binder.onChange.bind(this)
    );
  },

  routine(el: HTMLElement | HTMLSelectElement, value: string | string[]) {
    const oldValue = this.getValue(el);
    if (this.customData.isRadio) {
      el.setAttribute("value", value as string);
    } else {
      if (this.customData.selectMultiple) {
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
      } else if (this.customData.contenteditable) {
        value = getString(value as string) || value;
        if (value !== oldValue) {
          el.innerHTML = value as string; // TODO write test for contenteditable
          el.dispatchEvent(new Event("change"));
        }
      } else {
        value = getString(value as string) || value;
        if (value !== oldValue) {
          (el as HTMLInputElement).value =
            value != null ? (value as string) : "";
          el.dispatchEvent(new Event("change"));
        }
      }
    }
    if (this.customData.publshInitalRoutine) {
      this.publish();
      this.customData.publshInitalRoutine = false;
    }
  },

  getValue: getInputValue,
};
