import { Binder } from '@ribajs/core';
import { CollapseService } from '../services/collapse.service';

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 */
export const collapseBinder: Binder<string> = {
  name: 'bs4-collapse',
  routine(el: HTMLElement, targetSelector: string) {

    const targets = el.querySelectorAll<HTMLElement>(targetSelector);

    const collapseService = new CollapseService(targets);

    const onStateChange = () => {
      if (collapseService.isCollapsed()) {
        el.classList.add(CollapseService.CLASSNAME.COLLAPSED);
        el.setAttribute('aria-expanded', 'false');
      } else {
        el.classList.remove(CollapseService.CLASSNAME.COLLAPSED);
        el.setAttribute('aria-expanded', 'true');
      }
    };

    targets.forEach((target) => {
      target.addEventListener(CollapseService.EVENT.SHOWN, onStateChange.bind(this));
      target.addEventListener(CollapseService.EVENT.HIDDEN, onStateChange.bind(this));
    });

    el.addEventListener('click', (event) => {
      event.preventDefault();
      collapseService.toggle();
    });

    onStateChange();
  },
};
