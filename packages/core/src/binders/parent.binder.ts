import { Binder } from "../types";

/**
 * parent
 * Binds the parent scope to your component
 */
export const parentBinder: Binder<any> = {
  name: "parent",
  routine(/*el: HTMLElement, value: object*/) {
    /**/
  },
  bind(el) {
    this.customData = {
      onAskForParent: () => {
        el.dispatchEvent(
          new CustomEvent("parent", { detail: this.view.models })
        );
      },
    };
    el.addEventListener(
      "ask-for-parent" as any,
      this.customData.onAskForParent,
      false
    );
    this.customData.onAskForParent();
  },

  unbind(el) {
    el.removeEventListener(
      "ask-for-parent" as any,
      this.customData.onAskForParent,
      false
    );
  },
};
