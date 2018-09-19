import Debug from 'debug';
import JQuery from 'jquery';
import { ITwoWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax } from './barba/barba';
import { View as RivetsView } from '../../view';
import { Utils } from '../../utils';

export interface IViewAppendOptions {
  url: string;
  listenAllLinks?: boolean;
  appendToSelector: string;
}

/**
 * Loads a url with pjax and append them to the element to the specified selector (appendToSelector)
 */
export const routeAppendBinderOnStarWrapper: BinderWrapper = () => {

  const name = 'route-append-on-*';
  const debug = Debug('binders:route-append-on-*');

  const binder: ITwoWayBinder<IViewAppendOptions> = {

    block: true,

    bind(el: HTMLElement) {
      const self = this;
      self.customData = {
        nested: null,
        eventName: this.args[0] as string,
        loadView: (event: Event) => {
          const $wrapper = JQuery(self.customData.options.appendToSelector + ':first') || JQuery(el);
          const pjax = new Pjax(self.customData.options.url, $wrapper, false, undefined, false);
          const $newContainer = pjax.load(self.customData.options.url);
          debug('loadView', $wrapper);
          $newContainer.then(($container: JQuery<HTMLElement>) => {
            $wrapper.append($container);
            $container.css('visibility', 'visible');
            // add the dateset to the model
            if (!Utils.isObject(self.view.models)) {
              self.view.models = {};
            }
            self.customData.nested = new RivetsView($container[0], self.view.models, self.view.options);
            self.customData.nested.bind();

            if (self.customData.options.replaceHistory) {
              window.history.replaceState(null, undefined, self.customData.options.url);
            }

            if (this.customData.options.removeAfterLoad) {
              self.unbind();
              el.remove();
            }
          });
        },
      };
      debug('bind', this.customData);
    },

    routine(el: HTMLElement, options: IViewAppendOptions) {
      debug('routine', this.customData);
      // Set default options
      this.customData.options = options;
      this.customData.options.listenAllLinks = this.customData.options.listenAllLinks || false;
      this.customData.options.replaceHistory = this.customData.options.replaceHistory || false;
      this.customData.options.removeAfterLoad = this.customData.options.removeAfterLoad || true;

      if (this.customData.options.removeAfterLoad) {
        JQuery(el).one(this.customData.eventName, this.customData.loadView);
      } else {
        JQuery(el).on(this.customData.eventName, this.customData.loadView);
      }
      // options.transition = options.transition || new HideShowTransition();
      debug('options', options);
    },

    unbind(el: HTMLUnknownElement) {
      debug('unbind');
      if (this.customData.nested) {
        debug('unbind nested'); // TODO not called?
        // do not unbind the nested view if this button is removed
        // this.customData.nested.unbind();
      }
      // not needed on JQuery.one: JQuery(el).off(this.customData.eventName, this.customData.loadView);
      if (this.customData) {
        delete this.customData;
      }
    },
  };

  return {
    binder,
    name,
  };
};
