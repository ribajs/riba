import Debug from 'debug';
import JQuery from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax, Prefetch, IState } from './barba/barba';
import { Dispatcher } from './barba/dispatcher';
import { View as RivetsView } from '../../view';
import { Utils } from '../../utils';

/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
const viewBinder: BinderWrapper = (dispatcher: Dispatcher, pjax: Pjax, prefetch: Prefetch) => {

  const name = 'view';
  const debug = Debug('binders:view');

  const binder: IOneWayBinder<string> = function (el: HTMLElement, options: any) {
    const $wrapper = JQuery(el);
    const self = this;

    this.customData = {
      nested: null,
    }   

    dispatcher.on('newPageReady', (currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isInit: boolean) => {
      debug('newPageReady dataset:', dataset);
      // unbind the old rivets view
      if (!isInit && self.customData.nested !== null) {
        self.customData.nested.unbind();
      }

      if(!Utils.isObject(self.view.models)) {
        self.view.models = {};
      }

      self.view.models.dataset = $container.data();

      // bind the new container
      self.customData.nested = new RivetsView($container[0], self.view.models, self.view.options);

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
