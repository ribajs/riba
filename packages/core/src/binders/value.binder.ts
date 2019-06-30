import { Debug, JQuery as $ } from '../modules';
import { IBinder } from '../interfaces';
import { Utils } from '../services/utils';

const debug = Debug('binder:value');

const getData = (el: HTMLElement) => {
  const customData: any = {};
  customData.$el = $(el);
  customData.type = customData.$el.prop('type');
  customData.tagName = customData.$el.prop('tagName');
  customData.contenteditable = customData.$el.attr('contenteditable') ? true : false;
  customData.isRadio = customData.tagName === 'INPUT' && customData.type === 'radio';
  return customData;
};

/**
 * Sets the element's value. Also sets the model property when the input changes
 * (two-way binder).
 */
export const valueBinder: IBinder<any> = {
  name: 'value',
  publishes: true,
  priority: 3000,

  bind(el: HTMLElement) {
    if (!this.customData) {
      this.customData = getData(el);
    }
    if (!this.customData.isRadio) {
      this.customData.event = el.getAttribute('event-name') || (el.tagName === 'SELECT' ? 'change' : 'input');
      const self = this;
      if (!this.customData.callback) {
        this.customData.callback = () => {
          debug('callback called');
          self.publish();
        };
      }

      if (!this.customData.event) {
        this.customData.event = 'change input keyup paste blur focus';
      }

      $(el).on(this.customData.event, this.customData.callback);
    }
  },

  unbind(el: HTMLUnknownElement) {
    $(el).off(this.customData.event, this.customData.callback);
  },

  routine(el: HTMLElement | HTMLSelectElement, value: string | string[]) {
    const oldValue = this.getValue(el);
    debug('routine value', value);
    if (!this.customData) {
      this.customData = getData(el);
    }
    if (this.customData.isRadio) {
      el.setAttribute('value', value as string);
    } else {
      if ((el as HTMLSelectElement).type === 'select-multiple') {
        if (Array.isArray(value)) {
          for (let i = 0; i < (el as HTMLSelectElement).options.length; i++) {
            const option = (el as HTMLSelectElement).options[i] as HTMLOptionElement;
            option.selected = value.indexOf(option.value) > -1;
          }
        }
      } else if (el.getAttribute('contenteditable')) {
        if (Utils.getString(value as string) !== oldValue) {
          el.innerHTML = value as string; // TODO write test for contenteditable
        }
      } else {
        if (Utils.getString(value as string) !== oldValue) {
          (el as HTMLInputElement).value = value != null ? value as string : '';
        }
      }
    }
  },

  getValue: Utils.getInputValue,
};
