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
    el.setBinderAttribute("$parent", this.view.models);
  },
};
