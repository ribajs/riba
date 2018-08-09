import Debug from 'debug';
import JQuery from 'jquery';
import { ITwoWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax, Prefetch, IState, HideShowTransition, ITransition } from './barba/barba';
import { GlobalEvent } from '../../global-event';
import { View as RivetsView } from '../../view';
import { Utils } from '../../utils';

/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
export const viewBinderWrapper: BinderWrapper = (dispatcher: GlobalEvent, prefetch: Prefetch) => {

  const debug = Debug('binders:view');
  const pjax = new Pjax('global');

  const binder: ITwoWayBinder<string> = {

    block: true,

    bind(el: HTMLUnknownElement) {
      debug('bind', this.customData);
      const self = this;
      this.customData = {
        nested: null,
        $wrapper: JQuery(el),
      };

      this.customData.onPageReady = (currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isInit: boolean) => {
        // unbind the old rivets view
        if (self.customData.nested) {
          debug('unbind nested'); // TODO not called?
          self.customData.nested.unbind();
        }

        // add the dateset to the model
        if (!Utils.isObject(self.view.models)) {
          self.view.models = {};
        }
        self.view.models.dataset = $container.data();

        debug('newPageReady dataset:', dataset);

        self.customData.nested = new RivetsView($container[0], self.view.models, self.view.options);
        self.customData.nested.bind();
      };

      /*
      * Make the dispatcher available in the model to register event handlers.
      *
      * I.e., if we have initialized rivets/tinybind with:
      *
      *  `rivets.bind(document.body, model)`,
      *
      * then we can register event handlers for the Barba router dispatcher like this:
      *
      *  `model.routerDispatcher.on('newPageReady', ...);`
      *  `model.routerDispatcher.on('transitionCompleted', ...);`
      * ...etc.
      *
      */
      this.view.models.routerDispatcher = dispatcher;
    },

    routine(el: HTMLUnknownElement, options: any) {
      debug('bind', this.customData);
      // Set default options
      options = options || {};
      options.listenAllLinks = options.listenAllLinks || true;
      options.transition = options.transition || new HideShowTransition();
      debug('options', options);

      dispatcher.on('newPageReady', this.customData.onPageReady);

      prefetch.init(options.listenAllLinks);
      pjax.start(this.customData.$wrapper, options.listenAllLinks, options.transition, true);
    },

    unbind(el: HTMLUnknownElement) {
      debug('unbind');
      if (dispatcher) {
        dispatcher.off('newPageReady', this.customData.onPageReady);
      }

      if (this.customData.nested !== null) {
        this.customData.nested.unbind();
      }

      delete this.customData;
    },
  };

  return {
    binder,
    name: 'view',
  };
};
