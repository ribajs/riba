import { handleizeFormatter } from "@ribajs/core";
import templateHorizontal from "./bs4-tabs-horizontal.component.html";
import templateVertical from "./bs4-tabs-vertical.component.html";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { TemplatesComponent } from "../templates/templates.component";
import { throttle } from "@ribajs/utils/src/control";

export interface Tab {
  title: string;
  content: string;
  handle: string;
  active: boolean;
  type?: string;
  index: number;
}

export interface Scope {
  items: Tab[];
  activate: Bs4TabsComponent["activate"];
  deactivate: Bs4TabsComponent["activate"];
  deactivateAll: Bs4TabsComponent["deactivateAll"];
  optionTabsAutoHeight: boolean;
  optionTabsAngle: "vertical" | "horizontal";
}

export class Bs4TabsComponent extends TemplatesComponent {
  public static tagName = "bs4-tabs";

  protected templateAttributes = [
    {
      name: "title",
      required: true,
    },
    {
      name: "handle",
      required: false,
    },
    {
      name: "type",
      required: false,
    },
    {
      name: "active",
      required: false,
    },
    {
      name: "index",
      required: false,
    },
  ];

  protected scope: Scope = {
    items: new Array<Tab>(),
    activate: this.activate,
    deactivate: this.deactivate,
    deactivateAll: this.deactivateAll,
    optionTabsAutoHeight: false,
    optionTabsAngle: "horizontal",
  };

  protected tabs?: NodeListOf<Element>;
  protected tabPanes?: NodeListOf<Element>;
  protected scrollable?: Element | null;

  static get observedAttributes() {
    return [
      "option-tabs-auto-height",
      "option-tabs-angle",
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
      "tab-10-title",
      "tab-10-content",
      "tab-10-handle",
      "tab-11-title",
      "tab-11-content",
      "tab-11-handle",
      "tab-12-title",
      "tab-12-content",
      "tab-12-handle",
      "tab-13-title",
      "tab-13-content",
      "tab-13-handle",
      "tab-14-title",
      "tab-14-content",
      "tab-14-handle",
      "tab-15-title",
      "tab-15-content",
      "tab-15-handle",
      "tab-16-title",
      "tab-16-content",
      "tab-16-handle",
      "tab-17-title",
      "tab-17-content",
      "tab-17-handle",
      "tab-18-title",
      "tab-18-content",
      "tab-18-handle",
      "tab-19-title",
      "tab-19-content",
      "tab-19-handle",
    ];
  }

  constructor(element?: HTMLElement) {
    super(element);
  }

  /**
   * Make all tabs panes as height as the heighest tab pane
   */
  public setHeight() {
    if (this.scope.optionTabsAutoHeight) {
      return;
    }
    // Bind static template
    this.setElements();

    let heigest = 0;
    if (!this.tabPanes) {
      return;
    }
    this.tabPanes.forEach((tabPane) => {
      if (!((tabPane as unknown) as HTMLElement).style) {
        return;
      }
      ((tabPane as unknown) as HTMLElement).style.height = "auto";
      ((tabPane as unknown) as HTMLElement).style.display = "block";
      const height = ((tabPane as unknown) as HTMLElement).offsetHeight || 0;
      if (height > heigest) {
        heigest = height;
      }
    });
    this.tabPanes.forEach((tabPane) => {
      if (!((tabPane as unknown) as HTMLElement).style) {
        return;
      }
      // Reset display style property
      ((tabPane as unknown) as HTMLElement).style.display = "";
      if (heigest > 0) {
        ((tabPane as unknown) as HTMLElement).style.height = heigest + "px";
      }
    });
  }

  public deactivateAll() {
    for (let index = 0; index < this.scope.items.length; index++) {
      const tab = this.scope.items[index];
      this.deactivate(tab);
    }
  }

  public deactivate(tab: Tab) {
    tab.active = false;

    const firstTabContentChild = this.getTabContentChildByIndex(tab.index);
    if (firstTabContentChild) {
      this.triggerVisibilityChangedForElement(firstTabContentChild, tab.active);
    }
  }

  public activate(tab: Tab) {
    this.deactivateAll();
    tab.active = true;

    const firstTabContentChild = this.getTabContentChildByIndex(tab.index);
    if (firstTabContentChild) {
      this.triggerVisibilityChangedForElement(
        firstTabContentChild as Element,
        tab.active
      );
    }

    if (event) {
      event.preventDefault();
    }
  }

  protected activateFirstTab() {
    if (this.scope.items.length > 0) {
      this.activate(this.scope.items[0]);
    }
  }

  protected getTabContentChildByIndex(index: number) {
    return (
      this.el.querySelector(
        `.tab-content .tab-pane:nth-child(${index + 1}) > *`
      ) || undefined
    );
  }

  /**
   * Trigger `visibility-changed` for components that need to update if visibility changes.
   * E.g. this event is used the bs4-slideshow component
   * @param element
   * @param visibile
   */
  protected triggerVisibilityChangedForElement(
    element: Element,
    visibile: boolean
  ) {
    setTimeout(() => {
      // Use this event to update any custom element when it becomes visibile
      element.dispatchEvent(
        new CustomEvent("visibility-changed", { detail: { visibile } })
      );
    }, 200);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.initTabs();
    this.activateFirstTab();
    this.init(Bs4TabsComponent.observedAttributes);
  }

  protected setElements() {
    this.tabs = this.el.querySelectorAll('[role="tab"]');
    this.tabPanes = this.el.querySelectorAll('[role="tabpanel"]');
    this.scrollable = this.el.querySelector("[scrollable]");
  }

  protected resizeTabsArray(newSize: number) {
    while (newSize > this.scope.items.length) {
      this.scope.items.push({
        handle: "",
        title: "",
        content: "",
        active: false,
        index: this.scope.items.length - 1,
      });
    }
  }

  protected onTabShownEventHandler(event: Event) {
    const curTab = (event.target || event.srcElement) as Element | null;
    if (!curTab) {
      return;
    }
    if (this.scrollable) {
      const tabScrollPosition = curTab.getBoundingClientRect();
      const scrollLeftTo =
        this.scrollable.scrollLeft || 0 + tabScrollPosition.left;
      // TODO animate
      // this.scrollable.animate({ scrollLeft: scrollLeftTo}, 'slow');
      this.scrollable.scrollLeft = scrollLeftTo;
    }
  }

  protected onResizeEventHandler() {
    this.setHeight();
  }

  protected initTabs() {
    // Bind static template
    this.setElements();

    if (this.tabs) {
      this.tabs.forEach((tab) => {
        tab.removeEventListener("shown.bs.tab", this.onTabShownEventHandler);
        tab.addEventListener("shown.bs.tab", this.onTabShownEventHandler);
      });
    }

    const onResize = () => {
      throttle(this.onResizeEventHandler.bind(this))();
    };

    if (this.scope.optionTabsAutoHeight) {
      window.removeEventListener("resize", onResize);
      window.addEventListener("resize", onResize);
      this.onResizeEventHandler();
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
        handleizeFormatter.read(this.scope.items[index].title);
    }
    if (attributeName.endsWith("Handle")) {
      this.scope.items[index].handle = newValue;
    }

    // if is first tab
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

  /**
   * Extends TemplatesComponent.transformTemplateAttributes to set the handle by the title if no handle is set
   */
  protected transformTemplateAttributes(attributes: any, index: number) {
    attributes = super.transformTemplateAttributes(attributes, index);
    if (!attributes.handle && attributes.title) {
      attributes.handle = handleizeFormatter.read(attributes.title);
    }
    attributes.active = attributes.active || false;
    return attributes;
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
    if (attributeName.startsWith("tab")) {
      this.addTabByAttribute(attributeName, newValue);
      this.initTabs();
    }
  }

  protected async afterBind(): Promise<any> {
    // Workaround
    setTimeout(() => {
      if (this.scope.optionTabsAutoHeight) {
        this.setHeight();
      }
    }, 500);
  }

  protected template() {
    // Only set the component template if there no childs or the childs are templates
    if (!hasChildNodesTrim(this.el) || this.hasOnlyTemplateChilds()) {
      if (this.scope.optionTabsAngle === "horizontal") {
        return templateHorizontal;
      } else {
        return templateVertical;
      }
    } else {
      return null;
    }
  }
}
