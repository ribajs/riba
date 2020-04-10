import { Binder } from "../interfaces";
import { Utils } from "../services/utils";

export interface Assign {
  key: string;
  value: any;
}

/**
 * parent
 * Binds the parent scope to your component
 */
export const parentBinder: Binder<Assign> = {
  name: "parent",
  routine(el: HTMLElement, value: object) {
    /**/
  },
  bind(el) {
    el.addEventListener(
      "ask-for-parent" as any,
      this.binder.onAskForParent.bind(this, el),
      false
    );
    this.binder.onAskForParent.call(this);
  },

  unbind(el) {
    el.removeEventListener(
      "ask-for-parent" as any,
      this.binder.onAskForParent,
      false
    );
  },

  onAskForParent() {
    this.el.dispatchEvent(
      new CustomEvent("parent", { detail: this.view.models })
    );
  },
};
