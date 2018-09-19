import Debug from 'debug';
import JQuery from 'jquery';
import { ITwoWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax, Prefetch, IState, HideShowTransition, ITransition } from './barba/barba';
import { GlobalEvent } from '../../global-event';
import { View as RivetsView } from '../../view';
import { Utils } from '../../utils';

/**
 * The main wrapper for the riba view
 * TODO convert this to a component
 *
 * ```
 *   <div rv-view='{"listenAllLinks": true}'>
 *     <div class="rv-view-container" {% include 'jumplink-utils-barba-container-attributes', parseCollection: true %}>
 *       {{ content_for_layout }}
 *     </div>
 *   </div>
 * ```
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

      this.customData.onTransitionCompleted = () => {
        debug('onTransitionCompleted');

        // scroll to Anchor of hash
        if (this.customData.options.scrollToAnchorHash && window.location.hash) {
          const $scrollToMe = JQuery(window.location.hash);
          if ($scrollToMe && $scrollToMe.length) {
            const offset = $scrollToMe.offset();
            if (offset && offset.top) {
              debug('scroll to anchor:', $scrollToMe);
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  JQuery('html').animate({scrollTop: offset.top}, {
                    duration: 1000,
                    complete: () => {
                      debug('scroll complete');
                      resolve();
                    },
                    fail: () => {
                      debug('scroll fail');
                      reject();
                    },
                  });
                }, 0);
              });
            }
          }
        }
        return Promise.resolve();
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
      this.customData.options = this.customData.options || {};
      this.customData.options.listenAllLinks = this.customData.options.listenAllLinks || true;
      this.customData.options.scrollToAnchorHash = this.customData.options.scrollToAnchorHash || true;
      this.customData.options.transition = this.customData.options.transition || new HideShowTransition(/*this.customData.options.scrollToAnchorHash*/);
      debug('options', this.customData.options);

      dispatcher.on('newPageReady', this.customData.onPageReady);
      dispatcher.on('transitionCompleted', this.customData.onTransitionCompleted);

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
