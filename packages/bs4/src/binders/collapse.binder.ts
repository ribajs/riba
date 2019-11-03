import { IBinder } from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';
import { CollapseService } from '../services/collapse.service';

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 */
export const collapseBinder: IBinder<string> = {
  name: 'bs4-collapse',
  routine(el: HTMLElement, targetSelector: string) {

    const $el = $(el);
    const $target = $(targetSelector);

    const collapseService = new CollapseService($target);

    const onStateChange = () => {
      if (collapseService.isCollapsed()) {
        $el
        .addClass(CollapseService.CLASSNAME.COLLAPSED)
        .attr('aria-expanded', 'false');
      } else {
        $el
        .removeClass(CollapseService.CLASSNAME.COLLAPSED)
        .attr('aria-expanded', 'true');
      }
    };

    $target.on(CollapseService.EVENT.SHOWN, onStateChange);

    $target.on(CollapseService.EVENT.HIDDEN, onStateChange);

    $el.on('click', (event) => {
      event.preventDefault();
      collapseService.toggle();
    });

    onStateChange();
  },
};
