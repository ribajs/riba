import { Component, TemplateFunction } from "@ribajs/core";
import { Collapse } from "../../services/collapse.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { JsxBs5CollapseProps, CollapseEvents } from "../../types/index.js";

interface Scope {
  title: string;
  content: string;
  collapsed: boolean;
  toggle: Bs5CollapseComponent["toggle"];
  show: Bs5CollapseComponent["show"];
  hide: Bs5CollapseComponent["hide"];
  collapseEl?: HTMLUnknownElement;
}

export class Bs5CollapseComponent extends Component {
  public static tagName = "bs5-collapse";

  protected autobind = true;

  protected collapse?: Collapse;

  static get observedAttributes(): (keyof JsxBs5CollapseProps)[] {
    return ["title", "content", "collapsed"];
  }

  protected requiredAttributes(): (keyof JsxBs5CollapseProps)[] {
    return ["title"];
  }

  public scope: Scope = {
    title: "",
    content:
      "Please set the content of the collapse using the content attribute or just by set the content as the child of this element",
    collapsed: true,
    toggle: this.toggle,
    show: this.show,
    hide: this.hide,
  };

  constructor() {
    super();
  }

  public hide() {
    console.debug("hide");
    if (this.collapse) {
      this.scope.collapsed = true;
      this.collapse.hide();
    }
  }

  public show() {
    if (this.collapse) {
      this.scope.collapsed = false;
      this.collapse.show();
    }
  }

  public toggle() {
    if (this.collapse) {
      this.collapse.toggle();
      this.scope.collapsed = !!this.scope.collapsed;
    }
  }

  protected addEventListeners() {
    if (this.scope.collapseEl) {
      this.scope.collapseEl.addEventListener(
        CollapseEvents.hide,
        this.onHide.bind(this),
      );
      this.scope.collapseEl.addEventListener(
        CollapseEvents.show,
        this.onShow.bind(this),
      );
    }
  }

  protected removeEventListeners() {
    if (this.scope.collapseEl) {
      this.scope.collapseEl.removeEventListener(
        CollapseEvents.hide,
        this.onHide.bind(this),
      );
      this.scope.collapseEl.removeEventListener(
        CollapseEvents.show,
        this.onShow.bind(this),
      );
    }
  }

  protected onShow() {
    console.debug("onShow");
    this.scope.collapsed = false;
    this.triggerVisibilityChangedForElement(!this.scope.collapsed);
  }

  protected onHide() {
    console.debug("onShow");
    this.scope.collapsed = true;
    this.triggerVisibilityChangedForElement(!this.scope.collapsed);
  }

  /**
   * Trigger `visibility-changed` for components that need to update if visibility changes.
   * Se also bsf-tabs
   * @param visible
   */
  protected triggerVisibilityChangedForElement(visible: boolean) {
    setTimeout(() => {
      const event = new CustomEvent("visibility-changed", {
        detail: { visible },
      });

      // Use this event to update any custom element when it becomes visible
      this.dispatchEvent(event);

      if (this.scope.collapseEl) {
        this.scope.collapseEl.dispatchEvent(event);
      }
    }, 200);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5CollapseComponent.observedAttributes);
  }

  protected async afterBind() {
    console.debug("afterBind", this.scope.collapsed);
    this.scope.collapseEl = this.querySelector(".collapse") || undefined;
    // this.addEventListeners(); TODO: Fixme calls onShow every time
    if (!this.scope.collapseEl) {
      throw new Error("No collapse element found!");
    }
    this.collapse = new Collapse(this.scope.collapseEl, {
      toggle: !this.scope.collapsed,
    });
  }

  protected template(): ReturnType<TemplateFunction> {
    if (hasChildNodesTrim(this)) {
      this.scope.content = this.innerHTML;
    }

    return (
      <div>
        <button
          rv-on-click="toggle"
          class="btn btn-primary"
          type="button"
          aria-expanded="false"
          rv-aria-controls="title | handleize"
          rv-text="title"
        ></button>
        <div class="collapse mt-2" rv-id="title">
          <div class="card card-body" rv-template="content"></div>
        </div>
      </div>
    );
  }
}
