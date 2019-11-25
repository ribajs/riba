import { Binder } from '@ribajs/core';
import { DropdownService } from '../services/dropdown.service';

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/dropdown/
 */
export const dropdownBinder: Binder<string> = {
  name: 'bs4-dropdown',
  routine(el: HTMLElement, option: string) {
    let toggler: HTMLButtonElement;
    if (el.classList.contains('dropdown-toggle')) {
      toggler = el as HTMLButtonElement;
    } else {
      toggler = el.querySelector('.dropdown-toggle') as HTMLButtonElement;
    }

    if (!toggler) {
      toggler = el as HTMLButtonElement;
    }

    const dropdownService = new DropdownService(toggler);

    toggler.addEventListener('click', (event) => {
      dropdownService.toggle();
    });
  },
};
