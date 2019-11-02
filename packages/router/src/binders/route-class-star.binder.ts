import { IBinder, EventDispatcher, Utils } from '@ribajs/core';

export const routeClassStarBinder: IBinder<string> = {

  name: 'route-class-*',

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
    const className = this.args[0].toString() || 'active';
    const isAnkerHTMLElement = el.tagName === 'A';
    if (!url && isAnkerHTMLElement) {
      const href = el.getAttribute('href');
      if (href) {
        url = href;
      }
    }
    const onUrlChange = (urlToCheck?: string) => {
      if (urlToCheck) {
        if (Utils.onRoute(urlToCheck)) {
          el.classList.add(className);
          // check if element is radio input
          if (el.getAttribute('type') === 'radio') {
            (el as HTMLInputElement).checked = true;
          }
          return true;
        } else {
          el.classList.remove(className);
          // uncheck if element is radio input
          if (el.getAttribute('type') === 'radio') {
            (el as HTMLInputElement).checked = false;
          }
        }
      }
      return false;
    };
    this.customData.dispatcher.on('newPageReady', () => onUrlChange(url));
    onUrlChange(url);
  },

  unbind(el: HTMLUnknownElement) {
    // console.warn('routeClassStarBinder routine', el);
  },
};
