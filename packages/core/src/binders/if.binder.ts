import { Binder } from "../binder.js";
import { View } from "../view.js";

/**
 * if
 * Inserts and binds the element and it's child nodes into the DOM when true.
 */
export class IfBinder extends Binder<boolean> {
  static key = "if";
  static block = true;
  priority = 4000;

  attached = false;
  nested?: View;

  bind(el: HTMLUnknownElement) {
    if (!this.marker) {
      this.marker = window?.document?.createComment(
        " riba: " + this.type + " " + this.keypath + " "
      );
      this.attached = false;
      if (!el.parentNode?.insertBefore) {
        // console.warn('Element has no parent node');
      } else {
        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      }
    } else if (this.nested) {
      this.nested.bind();
    }
  }

  unbind() {
    if (this.nested) {
      this.nested.unbind();
    }
  }

  routine(el: HTMLElement, value: boolean) {
    value = !!value;
    if (value !== this.attached) {
      if (value) {
        if (!this.nested) {
          this.nested = new View(el, this.view.models, this.view.options);
          this.nested.bind();
        }
        if (!this.marker || !this.marker.parentNode) {
          // console.warn('Marker has no parent node');
        } else {
          this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
        }
        this.attached = true;
      } else {
        if (!el.parentNode) {
          // console.warn('Element has no parent node');
        } else {
          el.parentNode.removeChild(el);
        }
        this.attached = false;
      }
    }
  }

  update(models: any) {
    if (this.nested) {
      this.nested.update(models);
    }
  }
}
