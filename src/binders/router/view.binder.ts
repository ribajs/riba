import Debug from 'debug';
import $ from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax, Prefetch, IState } from './barba/index';
import { Dispatcher } from './barba/dispatcher';
import { View as RivetsView } from '../../view';

/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
export const viewBinder: BinderWrapper = (dispatcher: Dispatcher, pjax: Pjax, prefetch: Prefetch) => {

  // TODO make to singleton
  // const dispatcher = new Dispatcher();
  // const pjax = new Pjax();
  // const prefetch = new Prefetch();

  const name = 'view';
  const debug = Debug('binders:view');

  const binder: IOneWayBinder<string> = function (el: HTMLElement, options: any) {
    const $wrapper = $(el);
    const self = this;

    this.customData = {
      nested: null,
    }   

    dispatcher.on('newPageReady', (currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, isInit: boolean) => {
      debug('newPageReady');
      // unbind the old rivets view
      if (!isInit && self.customData.nested !== null) {
        self.customData.nested.unbind();
      }
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
