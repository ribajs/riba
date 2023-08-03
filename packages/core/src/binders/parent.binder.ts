import { Binder } from "../binder.js";
import { BasicComponent } from "../component/basic-component.js";
import { isCustomElement, waitForCustomElement } from "@ribajs/utils";

/**
 * parent
 * Binds the parent scope to your component
 */
export class ParentBinder extends Binder<any, BasicComponent> {
  static key = "parent";
  routine() {
    /**/
  }
  private bindIntern(el: BasicComponent) {
    if (el.setBinderAttribute) {
      el.setBinderAttribute("$parent", this.view.models);
    } else {
      console.warn(
        "[parentBinder] You can only use this binder on Riba components",
        el.localName,
        customElements.get(el.localName),
      );
    }
  }

  async bind(el: BasicComponent) {
    if (isCustomElement(el, true, true)) {
      this.bindIntern(el);
    } else if (isCustomElement(el, true)) {
      console.info(
        `[parentBinder] CustomElement ${el.localName} has been defined, but is not yet upgraded. Waiting for upgrade..`,
        el,
      );
      await waitForCustomElement(el);
      this.bindIntern(el);
    } else {
      console.warn(
        "[parentBinder] You can only use this binder on Riba components",
        el.localName,
      );
    }
  }
}
