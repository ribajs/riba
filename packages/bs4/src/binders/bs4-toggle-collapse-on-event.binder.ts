import { Binder } from '@ribajs/core';
// import { CollapseService } from '../services/collapse.service';
import { CollapseService } from '../services/collapse.service';


export interface Bs4CollapseOnEventBinder extends Binder<boolean> {
  onEvent: (event: Event) => void;
  collapseServices: CollapseService[];
  targets: NodeListOf<HTMLElement>;
}

/**
 * 
 */
export const toggleCollapseOnEventBinder: Binder<string> = {
  name: 'bs4-toggle-collapse-on-*',
  collapseServices: [] as CollapseService[],
  targets: null,
  onEvent(event: Event) {
    const self = (this.binder || this) as Bs4CollapseOnEventBinder;
    event.preventDefault();
    // console.debug('[toggleCollapseOnEventBinder] onEvent', self.collapseServices);
    self.collapseServices.forEach((collapseService) => {
      collapseService.toggle();
    });
  },
  bind() {
    /**/
  },
  unbind() {
    const self = (this.binder || this) as Bs4CollapseOnEventBinder;
    const eventName = this.args[0] as string;
    this.el.removeEventListener(eventName, self.onEvent.bind(this));
  },
  routine(el: HTMLElement, targetSelector: string) {

    if (this.args === null) {
      throw new Error("args is null");
    }
    const self = (this.binder || this) as Bs4CollapseOnEventBinder;
    const eventName = this.args[0] as string;

    self.targets = document.querySelectorAll<HTMLElement>(targetSelector);

    if (self.targets.length <= 0) {
      console.warn(`[toggleCollapseOnEventBinder] No element with selector "${targetSelector}" found.`);
    }

    self.targets.forEach((target) => {
      self.collapseServices.push(new CollapseService(target, [el], {toggle: false }));
    });

    el.addEventListener(eventName, self.onEvent.bind(this));

    // onStateChange();
  },
};
