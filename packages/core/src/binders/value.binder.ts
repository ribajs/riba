import Debug from 'debug';
import { ITwoWayBinder } from '../services/binder.service';
import { Utils } from '../services/utils';
import $ from 'jquery';

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
export const valueBinder: ITwoWayBinder<any> = {
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
          self.publish();
        };
      }

      if (!this.customData.event) {
        this.customData.event = 'change input keyup paste blur focus';
      }

      $(el).on(this.customData.event, this.customData.callback);
    }
  },

  unbind(el) {
    $(el).off(this.customData.event, this.customData.callback);
  },

  routine(el: HTMLElement, value) {
    const oldValue = this.getValue((el as HTMLInputElement));
    debug('routine value', value);
    if (!this.customData) {
      this.customData = getData(el);
    }
    if (this.customData.isRadio) {
      el.setAttribute('value', value);
    } else {
      if ((el as HTMLSelectElement).type === 'select-multiple' && el instanceof HTMLSelectElement) {
        if (value instanceof Array) {
          for (let i = 0; i < el.length; i++) {
            const option = el[i] as HTMLOptionElement;
            option.selected = value.indexOf(option.value) > -1;
          }
        }
      } else if (el.getAttribute('contenteditable')) {
        if (Utils.getString(value) !== oldValue) {
          el.innerHTML = value; // TODO write test for contenteditable
        }
      } else {
        if (Utils.getString(value) !== oldValue) {
          (el as HTMLInputElement).value = value != null ? value : '';
        }
      }
    }
  },

  getValue: Utils.getInputValue,
};
