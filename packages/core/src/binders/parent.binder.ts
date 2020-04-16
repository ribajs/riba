import { Binder } from "../interfaces";

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
    this.binder.onAskForParent.bind(this)(el);
  },

  unbind(el) {
    el.removeEventListener(
      "ask-for-parent" as any,
      this.binder.onAskForParent,
      false
    );
  },

  onAskForParent(el: HTMLElement) {
    // console.debug("onAskForParent", el, this.view.models);
    el.dispatchEvent(new CustomEvent("parent", { detail: this.view.models }));
  },
};
