import Debug from 'debug';
import JQuery from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax, Prefetch, IState, HideShowTransition, ITransition } from './barba/barba';
import { GlobalEvent } from '../../global-event';
import { View as RivetsView } from '../../view';
import { Utils } from '../../utils';

/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
export const viewStaticBinderWrapper: BinderWrapper = () => {

  const name = 'view-static';
  const debug = Debug('binders:view-static');

  const binder: IOneWayBinder<string> = function(el: HTMLElement, options: any) {
    const $wrapper = JQuery(el);
    const self = this;

    // Set default options
    options = options || {};
    options.listenAllLinks = false;
    // options.transition = options.transition || new HideShowTransition();
    debug('options', options);

    const pjax = new Pjax(options.url, $wrapper, false, undefined, false);

    const $newContainer = pjax.load(options.url);

    this.customData = {
      nested: null,
    };

    $newContainer.then(($container: JQuery<HTMLElement>) => {
      $wrapper.replaceWith($container);

      $container.css('visibility', 'visible');

      // add the dateset to the model
      if (!Utils.isObject(self.view.models)) {
        self.view.models = {};
      }

      // self.view.models.dataset = $container.data();

      self.customData.nested = new RivetsView($container[0], self.view.models, self.view.options);
      self.customData.nested.bind();

    });
  };

  return {
    binder,
    name,
  };
};
