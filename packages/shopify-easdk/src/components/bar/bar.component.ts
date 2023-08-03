import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import {
  BarConfig,
  BarWrapper,
  LoadingStateWrapper,
  ButtonsConfig,
  PaginationConfig,
  ButtonConfig,
  BarWrapperService,
} from "../../index.js";

import pugTemplate from "./bar.component.pug";

interface Scope extends BarConfig {
  /**
   * An object describing the buttons displayed in the top bar.
   * The object contains two keys, primary and secondary, and each of those keys contain an array of button objects.
   * Primary buttons default to blue, and have a maximum of one button.
   * Secondary buttons have a maximum of four buttons.
   */
  buttons?: ButtonsConfig;
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
  pagination?: PaginationConfig;
  /**
   * A button object configuring and toggling the breadcrumb in the top bar.
   */
  breadcrumb?: ButtonConfig;

  /**
   * If true the loading bar shows a loading animation
   */
  loading?: boolean;

  /**
   * Show the fallback bar which is normally only used outside the iframe
   */
  showFallbackBar: boolean;
}

export class BarComponent extends Component {
  public static tagName = "rv-shopify-easdk-bar";

  static get observedAttributes(): string[] {
    return [
      "buttons",
      "title",
      "icon",
      "pagination",
      "breadcrumb",
      "loading",
      "show-fallback-bar",
    ];
  }

  protected bar: BarWrapper = new BarWrapperService();

  public scope: Scope = {
    showFallbackBar: false,
  };

  constructor() {
    super();
    this.listenForConfigChanges();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(BarComponent.observedAttributes);
  }

  protected listenForConfigChanges() {
    this.bar.event.on("bar:setShowFallbackBar", (showFallbackBar: boolean) => {
      this.scope.showFallbackBar = showFallbackBar;
    });

    this.bar.event.on(
      "bar:initialize",
      (fallback: boolean, config: BarConfig) => {
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
        console.debug("bar:initialize", fallback, config);
      },
    );

    this.bar.event.on("bar:setTitle", (fallback: boolean, title: string) => {
      if (this.scope.title !== title) {
        this.scope.title = title;
      }
      console.debug("bar:setTitle", fallback, title);
    });

    this.bar.event.on(
      "bar:loading",
      (fallback: boolean, loading: LoadingStateWrapper) => {
        if (this.scope.loading !== loading.on) {
          this.scope.loading = loading.on;
        }
        console.debug("bar:loading", fallback, loading);
      },
    );

    this.bar.event.on(
      "bar:setPagination",
      (fallback: boolean, pagination?: PaginationConfig) => {
        if (this.scope.pagination !== pagination) {
          this.scope.pagination = pagination;
        }
        console.debug("bar:setPagination", fallback, pagination);
      },
    );

    this.bar.event.on(
      "bar:setBreadcrumb",
      (fallback: boolean, breadcrumb?: ButtonConfig) => {
        if (this.scope.breadcrumb !== breadcrumb) {
          this.scope.breadcrumb = breadcrumb;
        }
        console.debug("bar:setBreadcrumb", fallback, breadcrumb);
      },
    );
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.scope.buttons = this.bar.buttons;
    this.scope.breadcrumb = this.bar.breadcrumb;
    this.scope.title = this.bar.title;
    this.scope.icon = this.bar.icon;
    this.scope.pagination = this.bar.pagination;
    this.scope.showFallbackBar = this.bar.showFallbackBar;
    console.debug("beforeBind");
  }

  protected async afterBind() {
    console.debug("afterBind", this.scope);
    await super.afterBind();
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  // deconstruction
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected async attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );

    if (attributeName === "buttons") {
      this.bar.initialize(this.scope);
    }

    if (attributeName === "title") {
      this.bar.setTitle(this.scope.title);
    }

    if (attributeName === "title" && this.scope.icon) {
      this.bar.setIcon(this.scope.icon);
    }

    if (attributeName === "pagination") {
      this.bar.setPagination(this.scope.pagination);
    }

    if (attributeName === "breadcrumb") {
      this.bar.setBreadcrumb(this.scope.breadcrumb);
    }

    if (attributeName === "loading") {
      if (this.scope.loading) {
        this.bar.loadingOn();
      } else {
        this.bar.loadingOff();
      }
    }

    if (attributeName === "show-fallback-bar") {
      this.bar.setShowFallbackBar(this.scope.showFallbackBar);
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      console.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      console.debug("Use template", template);
      return template;
    }
  }
}
