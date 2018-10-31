import Debug from 'debug';
import JQuery from 'jquery';
import { ITwoWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax, HideShowTransition } from './barba/barba';
import { View as RivetsView } from '../../view';
import { Utils } from '../../utils';

/**
 * Loads a url with pjax and show them insite the element this binder is used on
 */
export const viewStaticBinderWrapper: BinderWrapper = () => {

  const name = 'view-static';
  const debug = Debug('binders:view-static');

  const binder: ITwoWayBinder<string> = {

    block: true,

    bind(el: HTMLElement) {
      debug('bind', this.customData);
      if (!this.customData) {
        this.customData = {
          nested: null,
        };
      }
    },

    routine(el: HTMLElement, options: any) {
      debug('routine', this.customData);
      const $wrapper = JQuery(el);
      const self = this;

      // Set default options
      options = options || {};
      options.listenAllLinks = false;
      options.listenPopstate = false;
      options.parseTitle = false;
      options.transition = options.transition || new HideShowTransition();
      options.viewId = options.url;
      debug('options', options);

      const pjax = new Pjax(options.viewId, $wrapper, '[data-namespace]', options.listenAllLinks, options.listenPopstate , options.transition, options.parseTitle);

      const $newContainer = pjax.load(options.url);

      $newContainer.then(($container: JQuery<HTMLElement>) => {
        $wrapper.replaceWith($container);

        $container.css('visibility', 'visible');

        // add the dateset to the model
        if (!Utils.isObject(self.view.models)) {
          self.view.models = {};
        }

        // self.view.models.dataset = $container.data();
        if (self.customData.nested) {
          debug('unbind nested');
          self.customData.nested.unbind();
        }
        self.customData.nested = new RivetsView($container[0], self.view.models, self.view.options);
        self.customData.nested.bind();

      });
    },

    unbind(el: HTMLUnknownElement) {

      debug('unbind');

      if (this.customData.nested) {
        debug('unbind nested'); // TODO not called?
        this.customData.nested.unbind();
      }

      delete this.customData;
    },
  };

  return {
    binder,
    name,
  };
};
