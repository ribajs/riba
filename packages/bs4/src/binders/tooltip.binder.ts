import Popper from 'popper.js'; // /dist/umd/popper

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/tooltips/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/tooltip.js
 */
import Debug from 'debug';
import { IBinder, JQuery as $ } from '@ribajs/core';

const template = '<div class="tooltip" role="tooltip">' +
'<div class="arrow"></div>' +
'<div class="tooltip-inner"></div></div>';

const debug = Debug('binder:rv-bs4-tooltip');

/**
 *
 */
export const tooltipBinder: IBinder<string> = {
  name: 'bs4-tooltip',
  block: false,
  bind(el: HTMLUnknownElement) {
    this.customData.$tip = $(template);
    this.customData.show = () => {
      const attachment: 'auto' | 'top' | 'right' | 'bottom' | 'left' = 'top';
      const offset = 0;
      this.customData.popper = new Popper(el, this.customData.$tip[0], {
        placement: attachment,
        modifiers: {
          offset: {
            offset,
          },
          flip: {
            behavior: 'flip',
          },
          arrow: {
            element: '.arrow',
          },
          preventOverflow: {
            boundariesElement: 'scrollParent',
          },
        },
        onCreate: (data) => {
          debug('onCreate');
        },
        onUpdate: (data) => {
          debug('onUpdate');
        },
      });
      this.customData.$tip.appendTo(document.body);
      this.customData.$tip.addClass('show');
      this.customData.$tip.addClass('bs-tooltip-' + attachment);
    };
    this.customData.hide = () => {
      this.customData.$tip.removeClass('show');
      if (this.customData.popper) {
        this.customData.popper.destroy();
      }
    };
    el.addEventListener('mouseenter', this.customData.show);
    el.addEventListener('mouseleave', this.customData.hide);
  },

  routine(el: HTMLElement, text: string) {
    debug('TODO routine');
    this.customData.$tip.find('.tooltip-inner').html(text);
  },

  unbind() {
    this.customData.hide();
    this.el.removeEventListener('mouseenter', this.customData.show);
    this.el.removeEventListener('mouseleave', this.customData.hide);
  },
};
