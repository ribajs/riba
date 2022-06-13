import { Binder } from "../binder.js";

/**
 * This binder can be used to disable (or enable) dragging ghost image for browser which have no support for the css feature `user-select: none;` like firefox.
 * This binder is useful in combination with the `scrollbar-draggable` binder.
 */
export class NoDragBinder extends Binder<boolean, HTMLElement> {
  static key = "draggable";

  enable = false;

  _onDrag(event: Event) {
    if (!this.enable) {
      // Ignore event is draggable is disabled
      event.preventDefault();
    }
  }

  onDrag = this._onDrag.bind(this);

  /** This method is called every time the attribute values changes */
  routine(el: HTMLElement, enable: boolean) {
    this.enable = enable;
    el.setAttribute("draggable", enable ? "true" : "false");
  }

  /** This method is called as soon as Riba bounds this binder */
  bind(el: HTMLElement) {
    el.addEventListener("dragstart", this.onDrag, true);
  }

  /** This method is called as soon as Riba unbound this binder */
  unbind(el: HTMLElement) {
    el.removeAttribute("draggable");
    el.removeEventListener("dragstart", this.onDrag, true);
  }
}
