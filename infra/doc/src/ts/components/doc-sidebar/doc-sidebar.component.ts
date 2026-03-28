import { Component, ScopeBase } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

interface NavLink {
  title: string;
  url: string;
  active: boolean;
  child_active: boolean;
  handle: string;
  level: number;
  levels: number;
  links: NavLink[];
  collapseable: boolean;
  collapsed: boolean;
}

interface Linklist {
  handle: string;
  links: NavLink[];
}

export interface Scope extends ScopeBase {
  linklist: Linklist;
  pills: boolean;
  vertical: boolean;
  collapseOnNewPage: boolean;
  showOnActiveChild: boolean;
  toggle: DocSidebarComponent["toggle"];
  collapse: DocSidebarComponent["collapse"];
  collapseAll: DocSidebarComponent["collapseAll"];
  show: DocSidebarComponent["show"];
  showAll: DocSidebarComponent["showAll"];
}

export class DocSidebarComponent extends Component {
  public static tagName = "doc-sidebar";

  static get observedAttributes(): string[] {
    return ["vertical", "pills", "collapse-on-new-page", "show-on-active-child"];
  }

  protected dispatcher = new EventDispatcher("main");

  public scope: Scope = {
    linklist: { handle: "doc-sidebar", links: [] },
    pills: false,
    vertical: true,
    collapseOnNewPage: true,
    showOnActiveChild: true,
    toggle: this.toggle.bind(this),
    collapse: this.collapse.bind(this),
    collapseAll: this.collapseAll.bind(this),
    show: this.show.bind(this),
    showAll: this.showAll.bind(this),
  };

  constructor() {
    super();
  }

  public toggle(link: NavLink) {
    link.collapsed = !link.collapsed;
  }

  public collapse(link: NavLink) {
    link.collapsed = true;
  }

  public collapseAll() {
    for (const link of this.scope.linklist.links) {
      if (link.collapseable) {
        link.collapsed = true;
      }
      for (const sublink of link.links) {
        if (sublink.collapseable) {
          sublink.collapsed = true;
        }
      }
    }
  }

  public show(link: NavLink) {
    link.collapsed = false;
  }

  public showAll() {
    for (const link of this.scope.linklist.links) {
      if (link.collapseable) {
        link.collapsed = false;
      }
      for (const sublink of link.links) {
        if (sublink.collapseable) {
          sublink.collapsed = false;
        }
      }
    }
  }

  public showByChildUrl(url: string) {
    for (const link of this.scope.linklist.links) {
      if (link.url === url) {
        return;
      }
      for (const sublink of link.links) {
        if (sublink.url === url) {
          if (link.collapseable) {
            link.collapsed = false;
          }
          return;
        }
        for (const subsublink of sublink.links) {
          if (subsublink.url === url) {
            if (link.collapseable) {
              link.collapsed = false;
            }
            if (sublink.collapseable) {
              sublink.collapsed = false;
            }
            return;
          }
        }
      }
    }
  }

  private transformNavData(navData: any[]): NavLink[] {
    return (navData || []).map((item: any, index: number) => ({
      title: item.title || "",
      url: item.url || "#",
      active: false,
      child_active: false,
      handle: (item.title || "").toLowerCase().replace(/\s+/g, "-"),
      level: 0,
      levels: (item.links || []).length > 0 ? 1 : 0,
      links: this.transformSubLinks(item.links || [], 1),
      collapseable: item.url === "#collapse" || item.collapseable === true,
      collapsed: item.collapsed !== false,
    }));
  }

  private transformSubLinks(links: any[], level: number): NavLink[] {
    return (links || []).map((item: any) => ({
      title: item.title || "",
      url: item.url || "#",
      active: false,
      child_active: false,
      handle: (item.title || "").toLowerCase().replace(/\s+/g, "-"),
      level,
      levels: (item.links || []).length > 0 ? 1 : 0,
      links: this.transformSubLinks(item.links || [], level + 1),
      collapseable: item.url === "#collapse" || item.collapseable === true,
      collapsed: item.collapsed !== false,
    }));
  }

  protected connectedCallback() {
    super.connectedCallback();

    // Parse navigation data from attribute
    const navDataAttr = this.getAttribute("navigation");
    if (navDataAttr) {
      try {
        const navData = JSON.parse(navDataAttr);
        this.scope.linklist.links = this.transformNavData(
          Array.isArray(navData) ? navData : [],
        );
      } catch (e) {
        console.error("Failed to parse navigation data:", e);
      }
    }

    // Auto-expand section containing current page
    if (this.scope.showOnActiveChild) {
      const currentPath = window.location.pathname.split("/").pop() || "index.html";
      this.showByChildUrl(currentPath);
    }

    // Listen for page changes
    this.dispatcher.on(
      "newPageReady",
      (_viewId: string, currentStatus: any) => {
        if (this.scope.collapseOnNewPage) {
          this.collapseAll();
        }
        if (this.scope.showOnActiveChild && currentStatus?.url) {
          const path = currentStatus.url.split("/").pop() || "";
          this.showByChildUrl(path);
        }
      },
    );

    this.init(DocSidebarComponent.observedAttributes);
  }

  protected async template() {
    if (hasChildNodesTrim(this)) {
      return null;
    }
    const { default: template } = await import(
      "./doc-sidebar.component.html?raw"
    );
    return template;
  }
}
