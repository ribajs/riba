import { Binder } from "../binder.js";
import { BinderAttributeChangedEvent } from "../types/index.js";
import { setAttribute } from "@ribajs/utils/src/index.js";

/**
 * Sets the attribute on the element. If no binder above is matched it will fall
 * back to using this binder.
 */
export class AttributeBinder extends Binder<any, HTMLElement> {
  static key = "attr-*";

  routine(el: HTMLElement, newValue: any) {
    if (!this.type) {
      throw new Error("Can't set attribute of " + this.type);
    }

    const {
      newValue: newValueFormatted,
      oldValue,
      changed,
    } = setAttribute(el, this.type, newValue);

    // If this is a source element, the parent a video element and the attribute is the `src`, start loading the video
    if (
      this.type === "src" &&
      (el as HTMLSourceElement).tagName.toUpperCase() === "SOURCE" &&
      (
        (el as HTMLSourceElement).parentElement as HTMLVideoElement
      )?.tagName.toUpperCase() === "VIDEO"
    ) {
      ((el as HTMLSourceElement).parentElement as HTMLVideoElement).load();
    }

    if (changed) {
      el.dispatchEvent(
        new CustomEvent("binder-changed", {
          detail: { name: this.type, newValue: newValueFormatted, oldValue },
        } as BinderAttributeChangedEvent)
      );
    }
  }
}
