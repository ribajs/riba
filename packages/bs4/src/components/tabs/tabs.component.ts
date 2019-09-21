/* tslint:disable:max-classes-per-file */
import { Component, Debug, JQuery as $ } from '@ribajs/core';

export class TabsComponent extends Component {

  public static tagName: string = 'bs4-tabs';

  protected debug = Debug('component:bs4-tabs');
  protected scope: any = {};

  private tabs: NodeListOf<Element>;
  private tabPanes: NodeListOf<Element>;
  private scrollable: Element | null;
  private tabsSameHeight = true;

  static get observedAttributes() {
    return [
      // TODO
      // 'tab-1-title', 'tab-1-content',
      // 'tab-2-title', 'tab-2-content',
      // 'tab-3-title', 'tab-3-content',
      // 'tab-4-title', 'tab-4-content',
      // 'tab-5-title', 'tab-5-content',
      // 'tab-6-title', 'tab-6-content',
      // 'tab-7-title', 'tab-7-content',
      // 'tab-8-title', 'tab-8-content',
      // 'tab-9-title', 'tab-9-content',
      // 'tab-10-title', 'tab-10-content',
      // 'tab-11-title', 'tab-11-content',
      // 'tab-12-title', 'tab-12-content',
      // 'tab-13-title', 'tab-13-content',
      // 'tab-14-title', 'tab-14-content',
      // 'tab-15-title', 'tab-15-content',
      // 'tab-16-title', 'tab-16-content',
      // 'tab-17-title', 'tab-17-content',
      // 'tab-18-title', 'tab-18-content',
      // 'tab-19-title', 'tab-19-content',
      // 'tab-20-title', 'tab-20-content',
    ];
  }

  constructor(element?: HTMLElement) {
    super(element);
    const self = this;
    this.tabs = this.el.querySelectorAll('.nav-link');
    this.tabPanes = this.el.querySelectorAll('.tab-pane');
    this.scrollable = this.el.querySelector('[scrollable]');

    this.debug('constructor', this.el, this.tabs, this.tabPanes);

    this.tabs.forEach((tab => {
      tab.addEventListener('click', (event) => {
        event.preventDefault();
        self.activateByTabElement(tab);
      });

      tab.addEventListener('shown.bs.tab', (event) => {
        const tab = (event.target || event.srcElement) as Element | null;
        if (!tab) {
          return;
        }
        if (this.scrollable) {
          const tabScrollPosition = tab.getBoundingClientRect();
          const scrollLeftTo = this.scrollable.scrollLeft || 0 + tabScrollPosition.left;
          // TODO animate
          // this.scrollable.animate({ scrollLeft: scrollLeftTo}, 'slow');
          this.scrollable.scrollLeft = scrollLeftTo;
        }
      });

      tab.addEventListener('shown.bs.tab', (event) => {
        if (this.scrollable) {
          const tabScrollPosition = tab.getBoundingClientRect();
          const scrollLeftTo = this.scrollable.scrollLeft || 0 + tabScrollPosition.left;
          // TODO animate
          // this.$scrollable.animate({ scrollLeft: scrollLeftTo}, 'slow');
          this.scrollable.scrollLeft = scrollLeftTo;
        }
      });

    }));

    this.activateByTabElement(this.tabs[0]);

    if (this.tabsSameHeight) {
      window.addEventListener('resize', () => {
        this.setHeight();
      });
    }

    this.init(TabsComponent.observedAttributes);
  }

  /**
   * Make all tabs panes as height as the heighest tab pane
   */
  public setHeight() {
    let heigest = 0;
    this.tabPanes.forEach((tabPane) => {
      if (!(tabPane as unknown as HTMLElement).style) {
        return;
      }
      (tabPane as unknown as HTMLElement).style.height = 'auto';
      (tabPane as unknown as HTMLElement).style.display = 'block';
      const height = (tabPane as unknown as HTMLElement).offsetHeight || 0;
      if (height > heigest) {
        heigest = height;
      }
    });
    this.tabPanes.forEach((tabPane) => {
      if (!(tabPane as unknown as HTMLElement).style) {
        return;
      }
      // Reset display style property
      (tabPane as unknown as HTMLElement).style.display = '';
      if (heigest > 0) {
        (tabPane as unknown as HTMLElement).style.height = heigest + 'px';
      }
    });
  }

  public deactivateAll() {
    this.tabs.forEach((tab) => {
      tab.classList.remove('active', 'show');
    });
    this.tabPanes.forEach((tabPane) => {
      tabPane.classList.remove('active', 'show');
    });
  }

  public activateByTabElement(tab: Element) {
    const target = tab.getAttribute('href');
    if (!target) {
      console.warn('The href attribute to find the target is required!');
      return;
    }
    const targetEl = this.el.querySelector(target);
    if (!targetEl) {
      console.warn(`Target not found with selector "${target}" not found!`);
      return;
    }
    this.debug('activate', target, targetEl);
    this.deactivateAll();
    targetEl.classList.add('active');
    targetEl.classList.add('show');
    tab.classList.add("active");
    targetEl.dispatchEvent(new Event('shown.bs.tab'));
    tab.dispatchEvent(new Event('shown.bs.tab'));
  }

  protected async afterBind(): Promise<any> {
    this.setHeight();
  }

  protected template() {
    return null;
  }
}
