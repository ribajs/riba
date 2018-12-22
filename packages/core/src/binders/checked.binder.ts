import { ITwoWayBinder, BinderWrapper } from '../services/binder.service';
import { Utils } from '../services/utils';

export const checked: ITwoWayBinder<string> = {
  publishes: true,
  priority: 2000,

  bind(el) {
    const self = this;
    this.customData = {};
    if (!this.customData.callback) {
      this.customData.callback = () => {
        self.publish();
      };
    }
    el.addEventListener('change', this.customData.callback);
  },

  unbind(el) {
    el.removeEventListener('change', this.customData.callback);
  },

  routine(el: HTMLElement, value) {
    if ((el as HTMLInputElement).type === 'radio') {
      (el as HTMLInputElement).checked = Utils.getString((el as HTMLInputElement).value) === Utils.getString(value);
    } else {
      (el as HTMLInputElement).checked = !!value;
    }
  },
};

/**
 * checked
 * Checks a checkbox or radio input when the value is true. Also sets the model
 * property when the input is checked or unchecked (two-way binder).
 */
export const checkedBinderWrapper: BinderWrapper = () => {
  const name = 'checked';

  return {
    binder: checked,
    name,
  };
};
