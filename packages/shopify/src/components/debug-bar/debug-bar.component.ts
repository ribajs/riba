import { Component } from "@ribajs/core";
import { elementIsVisable, hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./debug-bar.component.html";

export class ShopifyDebugBarComponent extends Component {
  public static tagName = "shopify-debug-bar";

  static get observedAttributes() {
    return ["theme-name"];
  }

  protected scope: any = {
    hasPreviewBar: false,
    hasAdminBar: false,
    toggleBar: this.toggleBar,
    hide: this.hide,
    hidden: false,
  };

  protected autobind = true;

  protected previewBar: HTMLIFrameElement | null = null;
  protected adminBar: HTMLIFrameElement | null = null;

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyDebugBarComponent.observedAttributes);
  }

  public attributeChangedCallback(
    name: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    this.debug("attributeChangedCallback", name, oldValue, newValue, namespace);
    // injects the changed attributes to scope
    super.attributeChangedCallback(name, oldValue, newValue, namespace);
  }

  public hide() {
    this.scope.hidden = !this.scope.hidden;
  }

  public toggleBar(forceHide = false) {
    if (this.previewBar) {
      if (forceHide === true || elementIsVisable(this.previewBar)) {
        // this.debug('hide previewbar');
        this.previewBar.setAttribute("hidden", "");
        // this.$previewBar.hide();
      } else {
        // this.debug('show previewbar');
        this.previewBar.removeAttribute("hidden");
        // this.$previewBar.show();
      }
    }

    if (this.adminBar) {
      if (forceHide === true || elementIsVisable(this.adminBar)) {
        // this.debug('hide adminbar');
        this.adminBar.setAttribute("hidden", "");
        // this.$adminBar.hide();
      } else {
        // this.debug('show adminbar');
        this.adminBar.removeAttribute("hidden");
        // this.$adminBar.show();
      }
    }
  }

  protected async beforeBind(): Promise<any> {
    // this.debug('beforeBind');
    this.previewBar = document.getElementById(
      "preview-bar-iframe"
    ) as HTMLIFrameElement | null;
    this.adminBar = document.getElementById(
      "admin-bar-iframe"
    ) as HTMLIFrameElement | null;

    if (this.previewBar) {
      this.scope.hasPreviewBar = true;
      this.toggleBar(true);
    } else {
      this.previewBar = null;
      this.scope.hasPreviewBar = false;
    }

    if (this.adminBar) {
      this.scope.hasAdminBar = true;
      this.toggleBar(true);
    } else {
      this.adminBar = null;
      this.scope.hasAdminBar = false;
    }
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this && hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
