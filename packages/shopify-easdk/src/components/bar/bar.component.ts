import {
  AbstractRibaComponent,
  JQuery,
  Debug,
} from '@ribajs/core';

import {
  IBarConfig,
  IBarWrapper,
  shopifyEasdkModule,
  ILoadingStateWrapper,
  IButtonsConfig,
  IPaginationConfig,
  IButtonConfig,
} from '../../index';

import pugTemplate from './bar.component.pug';

interface IScope extends IBarConfig {
  /**
   * An object describing the buttons displayed in the top bar.
   * The object contains two keys, primary and secondary, and each of those keys contain an array of button objects.
   * Primary buttons default to blue, and have a maximum of one button.
   * Secondary buttons have a maximum of four buttons.
   */
  buttons?: IButtonsConfig;
  /**
   * The title string displayed in the header behind the application's name.
   */
  title?: string;
  /**
   * A URL to an image file used as the icon in the top bar. If omitted, a default app icon will be used.
   */
  icon?: string;
  /**
   * An object configuring and toggling the pagination arrow button group.
   */
  pagination?: IPaginationConfig;
  /**
   * A button object configuring and toggling the breadcrumb in the top bar.
   */
  breadcrumb?: IButtonConfig;

  /**
   * If true the loading bar shows a loading animation
   */
  loading?: boolean;

  /**
   * Show the fallback bar which is normally only used outside the iframe
   */
  showFallbackBar: boolean;
}

export class BarComponent extends AbstractRibaComponent {

  public static tagName: string = 'rv-shopify-easdk-bar';

  static get observedAttributes() {
    return ['buttons', 'title', 'icon', 'pagination', 'breadcrumb', 'loading', 'show-fallback-bar'];
  }

  protected bar: IBarWrapper = new shopifyEasdkModule.services.BarWrapperService();

  protected $el: JQuery<HTMLElement>;
  protected debug = Debug('component:' + BarComponent.tagName);

  protected scope: IScope = {
    showFallbackBar: false,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = JQuery(this.el);
    this.debug('constructor', this);
    this.init(BarComponent.observedAttributes);
    this.listenForConfigChanges();
  }

  protected listenForConfigChanges() {

    this.bar.event.on('bar:setShowFallbackBar', (showFallbackBar: boolean) => {
      this.scope.showFallbackBar = showFallbackBar;
      this.debug('bar:showFallbackBar', showFallbackBar);
    });

    this.bar.event.on('bar:initialize', (fallback: boolean, config: IBarConfig) => {
      if (this.scope.buttons !== config.buttons) {
        this.scope.buttons = config.buttons;
      }
      if (this.scope.breadcrumb !== config.breadcrumb) {
        this.scope.breadcrumb = config.breadcrumb;
      }
      if (this.scope.title !== config.title) {
        this.scope.title = config.title;
      }
      if (this.scope.icon !== config.icon) {
        this.scope.icon = config.icon;
      }
      if (this.scope.pagination !== config.pagination) {
        this.scope.pagination = config.pagination;
      }
      this.debug('bar:initialize', fallback, config);
    });

    this.bar.event.on('bar:setTitle', (fallback: boolean, title: string) => {
      if (this.scope.title !== title) {
        this.scope.title = title;
      }
      this.debug('bar:setTitle', fallback, title);
    });

    this.bar.event.on('bar:loading', (fallback: boolean, loading: ILoadingStateWrapper) => {
      if (this.scope.loading !== loading.on) {
        this.scope.loading = loading.on;
      }
      this.debug('bar:loading', fallback, loading);
    });

    this.bar.event.on('bar:setPagination', (fallback: boolean, pagination?: IPaginationConfig) => {
      if (this.scope.pagination !== pagination) {
        this.scope.pagination = pagination;
      }
      this.debug('bar:setPagination', fallback, pagination);
    });

    this.bar.event.on('bar:setBreadcrumb', (fallback: boolean, breadcrumb?: IButtonConfig) => {
      if (this.scope.breadcrumb !== breadcrumb) {
        this.scope.breadcrumb = breadcrumb;
      }
      this.debug('bar:setBreadcrumb', fallback, breadcrumb);
    });

  }

  protected async beforeBind() {
    this.scope.buttons =  this.bar.buttons;
    this.scope.breadcrumb =  this.bar.breadcrumb;
    this.scope.title =  this.bar.title;
    this.scope.icon =  this.bar.icon;
    this.scope.pagination =  this.bar.pagination;
    this.scope.showFallbackBar =  this.bar.showFallbackBar;
    this.debug('beforeBind');
  }

  protected async afterBind() {

    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.attributeChangedCallback(attributeName, oldValue, newValue, namespace);

    if (attributeName === 'buttons') {
      this.bar.initialize(this.scope);
    }

    if (attributeName === 'title') {
      this.bar.setTitle(this.scope.title);
    }

    if (attributeName === 'title' && this.scope.icon) {
      this.bar.setIcon(this.scope.icon);
    }

    if (attributeName === 'pagination') {
      this.bar.setPagination(this.scope.pagination);
    }

    if (attributeName === 'breadcrumb') {
      this.bar.setBreadcrumb(this.scope.breadcrumb);
    }

    if (attributeName === 'loading') {
      if (this.scope.loading) {
        this.bar.loadingOn();
      } else {
        this.bar.loadingOff();
      }
    }

    if (attributeName === 'show-fallback-bar') {
      this.bar.setShowFallbackBar(this.scope.showFallbackBar);
    }
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      this.debug('Do not template, because element has child nodes');
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug('Use template', template);
      return template;
    }
  }
}
