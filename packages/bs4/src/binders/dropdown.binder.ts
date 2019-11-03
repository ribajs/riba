import { IBinder } from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';
import { DropdownService } from '../services/dropdown.service';

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/dropdown/
 */
export const dropdownBinder: IBinder<string> = {
  name: 'bs4-dropdown',
  routine(el: HTMLElement, option: string) {
    const $el = $(el);
    let $toggler: JQuery<HTMLButtonElement>;
    if ($el.hasClass('dropdown-toggle')) {
      $toggler = $el as JQuery<HTMLButtonElement>;
    } else {
      $toggler = $el.find('.dropdown-toggle') as JQuery<HTMLButtonElement>;
    }

    if (!$toggler) {
      $toggler = $el as JQuery<HTMLButtonElement>;
    }

    const dropdownService = new DropdownService($toggler[0]);

    $toggler.on('click', (event) => {
        dropdownService.toggle();
    });
  },
};
