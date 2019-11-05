import { IBinder, Utils, View as RivetsView, handleizeFormatter } from '@ribajs/core';
import { Pjax, HideShowTransition } from '../services';

/**
 * Loads a url with pjax and show them insite the element this binder is used on
 */
export const viewStaticBinder: IBinder<string> = {
  name: 'view-static',
  block: true,

  bind(el: HTMLElement) {
    if (!this.customData) {
      this.customData = {
        nested: null,
      };
    }
  },

  routine(el: HTMLElement, options: any) {
    const wrapper = el;
    const self = this;

    // Set default options
    options = options || {};
    options.listenAllLinks = false;
    options.listenPopstate = false;
    options.parseTitle = false;
    options.transition = options.transition || new HideShowTransition();
    options.viewId = options.viewId || el.getAttribute('id') || handleizeFormatter.read(options.url);
    options.containerSelector = options.containerSelector || '[data-namespace]';

    const pjax = new Pjax(options.viewId, wrapper, options.containerSelector, options.listenAllLinks, options.listenPopstate , options.transition, options.parseTitle);

    const $newContainer = pjax.load(options.url);

    $newContainer.then((container: HTMLElement) => {
      wrapper.replaceWith(container);

      container.style.visibility = 'visible';

      // add the dateset to the model
      if (!Utils.isObject(self.view.models)) {
        self.view.models = {};
      }

      // self.view.models.dataset = container.data();
      if (self.customData.nested) {
        self.customData.nested.unbind();
      }
      self.customData.nested = new RivetsView(container, self.view.models, self.view.options);
      self.customData.nested.bind();

    });
  },

  unbind(el: HTMLUnknownElement) {
    if (this.customData.nested) {
      this.customData.nested.unbind();
    }
    delete this.customData;
  },
};
