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
    if (el.setBinderAttribute) {
      el.setBinderAttribute("$parent", this.view.models);
    } else {
      console.warn(
        "[parentBinder] You can only use this binder on Riba components",
        el
      );
    }
  },
};
