import { Binder } from '@ribajs/core';
// import { CollapseService } from '../services/collapse.service';
import { CollapseService, CLASS_NAME_COLLAPSED, EVENT_HIDDEN, EVENT_SHOWN } from '../services/collapse.service';

export const collapseBinder: Binder<string> = {
  name: 'bs4-collapse',
  bind() {
    /** */
  },
  routine(el: HTMLElement, targetSelector: string) {

    const targets = el.querySelectorAll<HTMLElement>(targetSelector);

    const collapseServices: CollapseService[] = [];

    targets.forEach((target) => {
      collapseServices.push(new CollapseService(target, [], {toggle: false }));
    });

    const onStateChange = () => {

      collapseServices.forEach((collapseService) => {
        if (collapseService.isCollapsed()) {
          el.classList.add(CLASS_NAME_COLLAPSED);
          el.setAttribute('aria-expanded', 'false');
        } else {
          el.classList.remove(CLASS_NAME_COLLAPSED);
          el.setAttribute('aria-expanded', 'true');
        }
      });
    };

    targets.forEach((target) => {
      target.addEventListener(EVENT_SHOWN, onStateChange.bind(this));
      target.addEventListener(EVENT_HIDDEN, onStateChange.bind(this));
    });

    el.addEventListener('click', (event) => {
      event.preventDefault();
      collapseServices.forEach((collapseService) => {
        collapseService.toggle();
      });
    });

    onStateChange();
  },
};
