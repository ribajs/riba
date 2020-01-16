import { Binder } from '../interfaces';

/**
 * maxlength
 */
export const maxlengthBinder: Binder<number> = {
  name: 'maxlength',

  bind(el) {
    this.customData = {};
  },

  unbind(el) {
  },

  routine(el: HTMLElement, maxLength?: number) {
    
    if (typeof(maxLength) === 'number') {
      (el as HTMLInputElement).setAttribute('maxlength', maxLength.toString());
      (el as HTMLInputElement).maxLength = maxLength;
    } else {
      (el as HTMLInputElement).removeAttribute('maxlength');
    }

  },
};
