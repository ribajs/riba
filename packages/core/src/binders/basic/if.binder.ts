import { ITwoWayBinder, BinderWrapper } from '../../binder.service';
import { View } from '../../view';

export const ifBinder: ITwoWayBinder<boolean> = {
  block: true,
  priority: 4000,

  bind(el: HTMLUnknownElement) {
    this.customData = {};
    if (!this.marker) {
      this.marker = document.createComment(' riba: ' + this.type + ' ' + this.keypath + ' ');
      this.customData.attached = false;
      if (!el.parentNode) {
        // console.warn('Element has no parent node');
      } else {
        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      }
    } else if ( this.customData.bound === false &&  this.customData.nested) {
      this.customData.nested.bind();
    }
    this.customData.bound = true;
  },

  unbind() {
    if ( this.customData.nested) {
      this.customData.nested.unbind();
      this.customData.bound = false;
    }
  },

  routine(el: HTMLElement, value: boolean) {
    value = !!value;
    if (value !== this.customData.attached) {
      if (value) {
        if (! this.customData.nested) {
          this.customData.nested = new View(el, this.view.models, this.view.options);
          this.customData.nested.bind();
        }
        if (!this.marker || !this.marker.parentNode) {
          // console.warn('Marker has no parent node');
        } else {
          this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
        }
        this.customData.attached = true;
      } else {
        if (!el.parentNode) {
          // console.warn('Element has no parent node');
        } else {
          el.parentNode.removeChild(el);
        }
        this.customData.attached = false;
      }
    }
  },

  update(models) {
    if ( this.customData.nested) {
      this.customData.nested.update(models);
    }
  },
};

/**
 * if
 * Inserts and binds the element and it's child nodes into the DOM when true.
 */
export const ifBinderWrapper: BinderWrapper = () => {
  const name = 'if';

  return {
    binder: ifBinder,
    name,
  };
};
