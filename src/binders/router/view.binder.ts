import Debug from 'debug';
import JQuery from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax, Prefetch, IState } from './barba/barba';
import { GlobalEvent } from '../../global-event';
import { View as RivetsView } from '../../view';
import { Utils } from '../../utils';

/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
const viewBinder: BinderWrapper = (dispatcher: GlobalEvent, pjax: Pjax, prefetch: Prefetch) => {

  const name = 'view';
  const debug = Debug('binders:view');

  const binder: IOneWayBinder<string> = function (el: HTMLElement, options: any) {
    const $wrapper = JQuery(el);
    const self = this;

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
    self.view.models.routerDispatcher = dispatcher;

    this.customData = {
      nested: null,
    }   

    dispatcher.on('newPageReady', (currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isInit: boolean) => {
      // unbind the old rivets view
      if (self.customData.nested !== null) {
        self.customData.nested.unbind();
      }

      // add the dateset to the model
      if(!Utils.isObject(self.view.models)) {
        self.view.models = {};
      }
      self.view.models.dataset = $container.data();

      debug('newPageReady dataset:', dataset);

      // if this is the first time the page will be loaded we do not need to rebind the container
      // because they are already bind with the parent view ( because they are not loaded by pajax) 
      if(!isInit) {
        // bind the new container
        self.customData.nested = new RivetsView($container[0], self.view.models, self.view.options);
        self.customData.nested.bind();
      }

    });

    setTimeout(() => {
      prefetch.init();
      pjax.start($wrapper);
    }, 0)
  };

  return {
    binder,
    name,
  };
};

export { viewBinder };
