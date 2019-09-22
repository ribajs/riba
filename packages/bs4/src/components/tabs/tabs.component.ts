import { Component, Debug, Binding } from '@ribajs/core';
import template from './tabs.component.html';

interface Tab {
  title: string;
  content: string;
  handle: string;
}

interface Scope {
  tabs: Tab[];
  activate: TabsComponent['activate'];
}

export class TabsComponent extends Component {

  public static tagName: string = 'bs4-tabs';

  protected debug = Debug('component:bs4-tabs');
  protected scope: Scope = {
    tabs: [],
    activate: this.activate,
  };

  private tabs: NodeListOf<Element>;
  private tabPanes: NodeListOf<Element>;
  private scrollable: Element | null;
  private tabsSameHeight = true;

  static get observedAttributes() {
    return [
      'tab-0-title', 'tab-0-content', 'tab-0-handle',
      'tab-1-title', 'tab-1-content', 'tab-1-handle',
      'tab-2-title', 'tab-2-content', 'tab-2-handle',
      'tab-3-title', 'tab-3-content', 'tab-3-handle',
      'tab-4-title', 'tab-4-content', 'tab-4-handle',
      'tab-5-title', 'tab-5-content', 'tab-5-handle',
      'tab-6-title', 'tab-6-content', 'tab-6-handle',
      'tab-7-title', 'tab-7-content', 'tab-7-handle',
      'tab-8-title', 'tab-8-content', 'tab-8-handle',
      'tab-9-title', 'tab-9-content', 'tab-9-handle',
      'tab-10-title', 'tab-10-content', 'tab-10-handle',
      'tab-11-title', 'tab-11-content', 'tab-11-handle',
      'tab-12-title', 'tab-12-content', 'tab-12-handle',
      'tab-13-title', 'tab-13-content', 'tab-13-handle',
      'tab-14-title', 'tab-14-content', 'tab-14-handle',
      'tab-15-title', 'tab-15-content', 'tab-15-handle',
      'tab-16-title', 'tab-16-content', 'tab-16-handle',
      'tab-17-title', 'tab-17-content', 'tab-17-handle',
      'tab-18-title', 'tab-18-content', 'tab-18-handle',
      'tab-19-title', 'tab-19-content', 'tab-19-handle',
    ];
  }

  constructor(element?: HTMLElement) {
    super(element);

    // Bind static template
    this.tabs = this.el.querySelectorAll('[role="tab"]');
    this.tabPanes = this.el.querySelectorAll('.tab-pane');
    this.scrollable = this.el.querySelector('[scrollable]');

    this.debug('constructor', this.el, this.tabs, this.tabPanes);

    this.tabs.forEach((tab => {
      // TODO use `rv-on-click="activate"` instead?
      tab.addEventListener('click', (event) => {
        this.activateByTabElement(tab, event);
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
    // static
    this.tabs.forEach((tabEl) => {
      tabEl.classList.remove('active', 'show');
    });
    this.tabPanes.forEach((tabPaneEl) => {
      tabPaneEl.classList.remove('active', 'show');
    });
    // dynamic
    this.scope.tabs.forEach((tab) => {
      const tabEl = this.el.querySelector('#tab-title-' + tab.handle);
      const tabPaneEl = this.el.querySelector('#tab-content-' + tab.handle);
      if (tabEl) tabEl.classList.remove('active', 'show');
      if (tabPaneEl) tabPaneEl.classList.remove('active', 'show');
    });
  }

  /**
   * Used for static templates 
   */
  public activateByTabElement(tab: Element, event?: Event) {
    if (event) {
      event.preventDefault();
    }
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

  public activate(binding: Binding, event: Event, model: any, el: HTMLElement) {
    this.activateByTabElement(el, event);
  }

  public activateByHandle(handle: string) {
    const tabEl = this.el.querySelector('#tab-title-' + handle);
    if (tabEl) {
      this.activateByTabElement(tabEl);
    }
  }

  public activateFirstTab() {
    const tabEl = this.el.querySelector('[role="tab"]');
    if (tabEl) {
      this.activateByTabElement(tabEl);
    }
  }

  protected resizeTabs(newSize: number) {
    while(newSize > this.scope.tabs.length) {
      this.scope.tabs.push({handle: '', title: '', content: ''});
    }
    this.scope.tabs.length = newSize;
  } 

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);
    if (attributeName.startsWith('tab')) {
      const index = Number(attributeName.replace(/[^0-9]/g, ''));
      this.debug('index', index);
      if (index >= this.scope.tabs.length) {
        this.resizeTabs(index + 1);
      }
      if (attributeName.endsWith('Content')) {
        this.scope.tabs[index].content = newValue;
      }
      if (attributeName.endsWith('Title')) {
        this.scope.tabs[index].title = newValue;
      }
      if (attributeName.endsWith('Handle')) {
        this.scope.tabs[index].handle = newValue;
      }

      if (
        this.scope.tabs.length > 0 &&
        this.scope.tabs[0] &&
        this.scope.tabs[0].content.length > 0 &&
        this.scope.tabs[0].title.length > 0 &&
        this.scope.tabs[0].handle.length > 0
      ) {
        this.activateFirstTab();
      }

      if (this.tabsSameHeight) {
        this.setHeight();
      }
    }
  }

  protected async afterBind(): Promise<any> {
    // Workaround
    setTimeout(() => {
      if (this.tabs.length > 0) {
        this.activateFirstTab();
      }
  
      if (this.tabsSameHeight) {
        this.setHeight();
      }
    }, 200);
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      this.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      this.debug('Use template', template);
      return template;
    }
  }
}
