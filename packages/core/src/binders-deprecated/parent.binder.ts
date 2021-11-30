import { BinderDeprecated } from "../types";
import { BasicComponent } from "../component/basic-component";
import { isCustomElement, waitForCustomElement } from "@ribajs/utils";

/**
 * parent
 * Binds the parent scope to your component
 */
export const parentBinder: BinderDeprecated<any, BasicComponent> = {
  name: "parent",
  routine() {
    /**/
  },
  _bind(el: BasicComponent) {
    if (el.setBinderAttribute) {
      el.setBinderAttribute("$parent", this.view.models);
    } else {
      console.warn(
        "[parentBinder] You can only use this binder on Riba components",
        el.localName,
        customElements.get(el.localName)
      );
    }
  },
  async bind(el) {
    if (isCustomElement(el, true, true)) {
      parentBinder._bind.call(this, el);
    } else if (isCustomElement(el, true)) {
      console.debug(
        `[parentBinder] CustomElement ${el.localName} has been defined, but not yet upgraded. Waiting for upgrade.`,
        el
      );
      await waitForCustomElement(el);
      parentBinder._bind.call(this, el);
    } else {
      console.warn(
        "[parentBinder] You can only use this binder on Riba components",
        el.localName
      );
    }
  },
};
