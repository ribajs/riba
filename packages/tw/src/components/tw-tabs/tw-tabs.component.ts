import {
  handleizeFormatter,
  FormatterFn,
  TemplateFunction,
  TemplatesComponent,
  ScopeBase,
} from "@ribajs/core";
import templateHorizontal from "./tw-tabs.component.html?raw";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { throttle } from "@ribajs/utils/src/control.js";

const handleize = handleizeFormatter.read as FormatterFn;

export interface Tab {
  title: string;
  content: string;
  handle: string;
  active: boolean;
  type?: string;
  index: number;
}

export interface Scope extends ScopeBase {
  items: Tab[];
  activate: TwTabsComponent["activate"];
  deactivate: TwTabsComponent["deactivate"];
  deactivateAll: TwTabsComponent["deactivateAll"];
  optionTabsAutoHeight: boolean;
}

export class TwTabsComponent extends TemplatesComponent {
  public static tagName = "tw-tabs";

  protected autobind = true;

  protected templateAttributes = [
    { name: "title", required: true },
    { name: "handle", required: false },
    { name: "type", required: false },
    { name: "active", required: false },
    { name: "index", required: false },
  ];

  public scope: Scope = {
    items: new Array<Tab>(),
    activate: this.activate.bind(this),
    deactivate: this.deactivate.bind(this),
    deactivateAll: this.deactivateAll.bind(this),
    optionTabsAutoHeight: false,
  };

  protected tabs?: NodeListOf<Element>;
  protected tabPanes?: NodeListOf<Element>;

  static get observedAttributes(): string[] {
    return [
      "option-tabs-auto-height",
      "tab-0-title",
      "tab-0-content",
      "tab-0-handle",
      "tab-1-title",
      "tab-1-content",
      "tab-1-handle",
      "tab-2-title",
      "tab-2-content",
      "tab-2-handle",
      "tab-3-title",
      "tab-3-content",
      "tab-3-handle",
      "tab-4-title",
      "tab-4-content",
      "tab-4-handle",
      "tab-5-title",
      "tab-5-content",
      "tab-5-handle",
      "tab-6-title",
      "tab-6-content",
      "tab-6-handle",
      "tab-7-title",
      "tab-7-content",
      "tab-7-handle",
      "tab-8-title",
      "tab-8-content",
      "tab-8-handle",
      "tab-9-title",
      "tab-9-content",
      "tab-9-handle",
    ];
  }

  constructor() {
    super();
  }

  protected _onResize() {
    this.setHeight();
  }

  protected onResize = throttle(this._onResize.bind(this));

  /**
   * Make all tab panes the same height as the tallest one.
   */
  public setHeight() {
    if (this.scope.optionTabsAutoHeight) {
      return;
    }
    this.setElements();

    let highest = 0;
    if (!this.tabPanes) return;

    this.tabPanes.forEach((pane) => {
      const el = pane as HTMLElement;
      if (!el.style) return;
      el.style.height = "auto";
      el.style.display = "block";
      const height = el.offsetHeight || 0;
      if (height > highest) {
        highest = height;
      }
    });

    this.tabPanes.forEach((pane) => {
      const el = pane as HTMLElement;
      if (!el.style) return;
      el.style.display = "";
      if (highest > 0) {
        el.style.height = highest + "px";
      }
    });
  }

  public deactivateAll() {
    for (const tab of this.scope.items) {
      this.deactivate(tab);
    }
  }

  public deactivate(tab: Tab) {
    tab.active = false;
    const child = this.getTabContentChildByIndex(tab.index);
    if (child) {
      this.triggerVisibilityChangedForElement(child, false);
    }
  }

  public activate(tab: Tab) {
    this.deactivateAll();
    tab.active = true;
    const child = this.getTabContentChildByIndex(tab.index);
    if (child) {
      this.triggerVisibilityChangedForElement(child, true);
    }
  }

  protected activateFirstTab() {
    if (this.scope.items.length > 0) {
      this.activate(this.scope.items[0]);
    }
  }

  protected getTabContentChildByIndex(index: number) {
    return (
      this.querySelector(
        `.tw-tab-content .tw-tab-pane:nth-child(${index + 1}) > *`,
      ) || undefined
    );
  }

  protected triggerVisibilityChangedForElement(
    element: Element,
    visible: boolean,
  ) {
    setTimeout(() => {
      element.dispatchEvent(
        new CustomEvent("visibility-changed", { detail: { visible } }),
      );
    }, 200);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.initTabs();
    this.activateFirstTab();
    this.init(TwTabsComponent.observedAttributes);
  }

  protected disconnectedCallback() {
    window.removeEventListener("resize", this.onResize);
  }

  protected setElements() {
    this.tabs = this.querySelectorAll('[role="tab"]');
    this.tabPanes = this.querySelectorAll('[role="tabpanel"]');
  }

  protected resizeTabsArray(newSize: number) {
    while (newSize > this.scope.items.length) {
      this.scope.items.push({
        handle: "",
        title: "",
        content: "",
        active: false,
        index: this.scope.items.length,
      });
    }
  }

  protected initTabs() {
    this.setElements();

    if (this.scope.optionTabsAutoHeight) {
      window.removeEventListener("resize", this.onResize);
      window.addEventListener("resize", this.onResize, { passive: true });
      this.setHeight();
    }
  }

  protected addTabByAttribute(attributeName: string, newValue: string) {
    const index = Number(attributeName.replace(/[^0-9]/g, ""));
    if (index >= this.scope.items.length) {
      this.resizeTabsArray(index + 1);
    }
    this.scope.items[index].index = index;
    if (attributeName.endsWith("Content")) {
      this.scope.items[index].content = newValue;
    }
    if (attributeName.endsWith("Title")) {
      this.scope.items[index].title = newValue;
      this.scope.items[index].handle =
        this.scope.items[index].handle ||
        handleize(this.scope.items[index].title);
    }
    if (attributeName.endsWith("Handle")) {
      this.scope.items[index].handle = newValue;
    }

    // Activate first tab once it has content and title
    if (
      this.scope.items.length > 0 &&
      this.scope.items[0] &&
      this.scope.items[0].content.length > 0 &&
      this.scope.items[0].title.length > 0 &&
      this.scope.items[0].handle.length > 0
    ) {
      this.activateFirstTab();
    }
  }

  protected transformTemplateAttributes(attributes: any, index: number) {
    attributes = super.transformTemplateAttributes(attributes, index);
    if (!attributes.handle && attributes.title) {
      attributes.handle = handleize(attributes.title);
    }
    attributes.active = attributes.active || false;
    return attributes;
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
    if (attributeName.startsWith("tab")) {
      this.addTabByAttribute(attributeName, newValue);
      this.initTabs();
    }
  }

  protected async afterBind(): Promise<any> {
    setTimeout(() => {
      if (this.scope.optionTabsAutoHeight) {
        this.setHeight();
      }
    }, 500);
    await super.afterBind();
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this) || this.hasOnlyTemplateChilds()) {
      return templateHorizontal;
    } else {
      return null;
    }
  }
}
