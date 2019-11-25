import Popper from 'popper.js'; // /dist/umd/popper

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/tooltips/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/tooltip.js
 */
import { Binder } from '@ribajs/core';

const template = document.createElement('div');
template.classList.add('tooltip');
template.setAttribute('role', 'tooltip');

const arrow = document.createElement('div');
arrow.classList.add('arrow');
template.appendChild(arrow);

const inner = document.createElement('div');
inner.classList.add('tooltip-inner');
template.appendChild(inner);

/**
 *
 */
export const tooltipBinder: Binder<string> = {
  name: 'bs4-tooltip',
  block: false,
  bind(el: HTMLUnknownElement) {
    // this.customData.$tip = $(template);
    this.customData.tip = template.cloneNode(true);
    this.customData.show = () => {
      const placement = (this.el.dataset.placement || 'top') as 'auto' | 'top' | 'right' | 'bottom' | 'left';
      const offset = 0;
      this.customData.popper = new Popper(el, this.customData.tip, {
        placement,
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
      });
      document.body.appendChild(this.customData.tip);
      this.customData.tip.classList.add('show');
      this.customData.tip.classList.add('bs-tooltip-' + placement);
    };
    this.customData.hide = () => {
      this.customData.tip.classList.remove('show');
      if (this.customData.popper) {
        this.customData.popper.destroy();
      }
    };
    el.addEventListener('mouseenter', this.customData.show);
    el.addEventListener('mouseleave', this.customData.hide);
  },

  routine(el: HTMLElement, text: string) {
    const innerEl = this.customData.tip.querySelector('.tooltip-inner') as HTMLDivElement;
    innerEl.innerHTML = text;
  },

  unbind() {
    this.customData.hide();
    this.el.removeEventListener('mouseenter', this.customData.show);
    this.el.removeEventListener('mouseleave', this.customData.hide);
  },
};
