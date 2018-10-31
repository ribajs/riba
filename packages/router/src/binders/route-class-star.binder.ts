import { ITwoWayBinder, BinderWrapper, EventDispatcher, JQuery, Utils } from '@ribajs/core';

export const routeClassStarBinderWrapper: BinderWrapper = () => {

  const binder: ITwoWayBinder<string> = {

    bind(el: HTMLUnknownElement) {
      this.customData = {
        dispatcher: new EventDispatcher('main'),
      };
    },

    /**
     * Tests the url with the current location, if the url is equal to the current location this element is active
     * @param el Binder HTML Element
     * @param url Url to compare with the current location
     */
    routine(el: HTMLElement, url: string) {
      const $el = JQuery(el);
      const className = this.args[0].toString() || 'active';
      const isAnkerHTMLElement = $el.prop('tagName') === 'A';
      if (!url && isAnkerHTMLElement) {
        const href = $el.attr('href');
        if (href) {
          url = href;
        }
      }
      const onUrlChange = (urlToCheck?: string) => {
        if (urlToCheck) {
          if (Utils.onRoute(urlToCheck)) {
            $el.addClass(className);
            // check if element is radio input
            if ($el.is(':radio')) {
              $el.prop('checked', true);
            }
            return true;
          } else {
            $el.removeClass(className);
            // uncheck if element is radio input
            if ($el.is(':radio')) {
              $el.prop('checked', false);
            }
          }
        }
        return false;
      };
      this.customData.dispatcher.on('newPageReady', () => onUrlChange(url));
      // JQuery(window).on('hashchange', () => onUrlChange(url));
      onUrlChange(url);
    },

    unbind(el: HTMLUnknownElement) {
      // console.warn('routeClassStarBinder routine', el);
    },
  };

  return {
    binder,
    name: 'route-class-*',
  };
};
