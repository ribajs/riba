import { IBinder, JQuery as $ } from '@ribajs/core';

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/scrollspy/
 */
export const scrollspyStarBinder: IBinder<string> = {
  name: 'bs4-scrollspy-*',
  routine(el: HTMLElement, targetSelector: string) {
    const $el = $(el);
    const nativeIDTargetSelector = targetSelector.replace('#', '');
    // const dispatcher = new EventDispatcher('main');
    let target = document.getElementById(nativeIDTargetSelector);
    let $target: JQuery<Element> | null = null;
    if (target) {
      $target = $(target);
    }
    const className = this.args[0] as string;

    /**
     * Determine if an element is in the viewport
     * @param elem The element
     * @return Returns true if element is in the viewport
     */
    const isInViewport = (elem: Element ): boolean => {
      if (!elem) {
        return false;
      }
      const distance = elem.getBoundingClientRect();
      return (
        distance.top + distance.height >= 0 && distance.bottom - distance.height <= 0
      );
    };

    const onScroll = () => {
      // reget element each scroll because it could be removed from the page using the router
      target = document.getElementById(nativeIDTargetSelector);
      if (target) {
        $target = $(nativeIDTargetSelector);
      } else {
        return;
      }

      if (isInViewport(target)) {
        $el.addClass(className);
        if ($el.is(':radio')) {
          $el.prop('checked', true);
        }
      } else {
        $el.removeClass(className);
        if ($el.is(':radio')) {
          $el.prop('checked', false);
        }
      }
    };

    $(window).off('scroll', onScroll).on('scroll', onScroll);
    onScroll();
  },
};
