import { Component } from "@ribajs/core";
import { CollapseService } from "../../services/collapse.service.js";
import template from "./tw-collapse.component.html?raw";

export class TwCollapseComponent extends Component {
  public static tagName = "tw-collapse";

  static get observedAttributes(): string[] {
    return ["title", "content", "collapsed"];
  }

  protected autobind = true;

  protected collapseService?: CollapseService;

  public scope = {
    title: "",
    content: "",
    collapsed: true,
    toggle: this.toggle.bind(this),
    show: this.show.bind(this),
    hide: this.hide.bind(this),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwCollapseComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return ["title"];
  }

  protected async beforeBind() {
    await super.beforeBind();
    if (this.hasChildNodes() && !this.scope.content) {
      this.scope.content = this.innerHTML;
    }
  }

  protected async afterBind() {
    await super.afterBind();
    const collapseEl =
      this.querySelector<HTMLElement>(".tw-collapse-content");
    if (collapseEl) {
      collapseEl.style.transition = "max-height 0.3s ease";
      this.collapseService = new CollapseService(collapseEl, {
        show: !this.scope.collapsed,
      });
    }
  }

  public toggle() {
    this.collapseService?.toggle();
    this.scope.collapsed = !this.collapseService?.isShown;
    this.dispatchVisibilityChanged();
  }

  public show() {
    this.collapseService?.show();
    this.scope.collapsed = false;
    this.dispatchVisibilityChanged();
  }

  public hide() {
    this.collapseService?.hide();
    this.scope.collapsed = true;
    this.dispatchVisibilityChanged();
  }

  protected dispatchVisibilityChanged() {
    this.dispatchEvent(
      new CustomEvent("visibility-changed", {
        detail: { collapsed: this.scope.collapsed },
      }),
    );
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.collapseService?.dispose();
  }

  protected template() {
    if (this.hasChildNodes()) {
      const nonTemplateChildren = Array.from(this.childNodes).filter(
        (n) =>
          n.nodeType !== Node.COMMENT_NODE &&
          (n as Element).tagName !== "TEMPLATE",
      );
      if (nonTemplateChildren.length > 0) {
        return null;
      }
    }
    return template;
  }
}
