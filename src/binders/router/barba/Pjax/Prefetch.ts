import Debug from 'debug';
import { Utils } from '../../../../utils';
import { Pjax } from './Pjax';

/**
 * Prefetch
 *
 * @namespace Barba.Prefetch
 * @type {object}
 */
class Prefetch {

  /**
   * Class name used to ignore prefetch on links
   *
   * @memberOf Barba.Prefetch
   * @type {String}
   * @default
   */
  public ignoreClassLink = 'no-barba-prefetch';

  private debug = Debug('Prefetch');

  /**
   * Init the event listener on mouseover and touchstart
   * for the prefetch
   *
   * @memberOf Barba.Prefetch
   */
  public init() {
    if (!window.history.pushState) {
      return false;
    }

    // We do this with rv-route
    // document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
    // document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
  }

  /**
   * Callback for the mousehover/touchstart
   *
   * @memberOf Barba.Prefetch
   * @private
   * @param  {object} evt
   */
  public onLinkEnter(evt: JQuery.Event<HTMLElement, null>, url?: string) {

    let el = (evt.target as HTMLAnchorElement);

    if (!url) {
      while (el && !Pjax.getHref(el)) {
        el = (el.parentNode as HTMLAnchorElement); // TODO testme
      }

      if (!el || el.classList.contains(this.ignoreClassLink)) {
        return;
      }

      url = Pjax.getHref(el);
    }

    this.debug('onLinkEnter', url);

    // Check if the link is elegible for Pjax
    if (Pjax.preventCheck(evt, el) && !Pjax.cache.get(url)) {
      const xhr = Utils.xhr(url);
      Pjax.cache.set(url, xhr);
    }
  }
}

export { Prefetch };
