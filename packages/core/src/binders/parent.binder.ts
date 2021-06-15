import { Binder } from "../types";
import { BasicComponent } from "../component/basic-component";

/**
 * parent
 * Binds the parent scope to your component
 */
export const parentBinder: Binder<any, BasicComponent> = {
  name: "parent",
  routine() {
    /**/
  },
  bind(el) {
    const customConstructor = customElements.get(el.localName);
    if (!customConstructor) {
      console.warn(
        "[parentBinder] You can only use this binder on Riba components",
        el.localName,
      );
    } else if (el.constructor === customConstructor) {
      if (el.setBinderAttribute) {
        el.setBinderAttribute("$parent", this.view.models);
      } else {
        console.warn(
          "[parentBinder] You can only use this binder on Riba components",
          el.localName,
          customElements.get(el.localName)
        );
      }
    } else {
      console.debug(
        `[parentBinder] CustomElement ${el.localName} has been defined, but not yet upgraded. Waiting for upgrade.`,
        el,
        el.constructor,
        customConstructor
      );
      window.customElements.whenDefined(el.localName).then((customElementConstructor) => {
        if (el.setBinderAttribute) {
          console.debug(`[parentBinder] Upgraded component ${el.localName}, binding $parent`,
            el,
            customElementConstructor,
            this.view.models
          );
          el.setBinderAttribute("$parent", this.view.models);
        } else {
          console.warn(
            "[parentBinder] You can only use this binder on Riba components",
            el.localName,
            customElements.get(el.localName)
          );
        }
      })
    }
  },
};
