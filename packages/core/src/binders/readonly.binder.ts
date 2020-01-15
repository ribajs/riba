import { Binder } from '../interfaces';

/**
 * readonly
 */
export const readonlyBinder: Binder<boolean> = {
  name: 'readonly',

  bind(el) {
    this.customData = {};
    this.customData.onChange = () => {
      this.publish();
    };
    el.addEventListener('change', this.customData.onChange, false);
  },

  unbind(el) {
    el.removeEventListener('change', this.customData.onChange, false);
  },

  routine(el: HTMLElement, readOnly: boolean) {
    readOnly = !!readOnly;
    (el as HTMLInputElement).readOnly = readOnly;
    if (readOnly) {
      (el as HTMLInputElement).setAttribute('readonly', '');
    } else {
      (el as HTMLInputElement).removeAttribute('readonly');
    }

  },
};
