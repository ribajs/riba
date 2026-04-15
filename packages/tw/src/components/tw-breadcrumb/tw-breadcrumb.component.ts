import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import template from "./tw-breadcrumb.component.html?raw";

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
  /** Computed display mode: "link" | "active" | "plain" */
  mode?: "link" | "active" | "plain";
}

interface Scope extends ScopeBase {
  items: BreadcrumbItem[];
  separator: string;
}

export class TwBreadcrumbComponent extends Component {
  public static tagName = "tw-breadcrumb";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["items", "separator"];
  }

  public scope: Scope = {
    items: [],
    separator: "/",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    // Parse templates BEFORE init() triggers template loading which replaces children
    if (this.scope.items.length === 0) {
      this.parseChildTemplates();
    }
    this.init(TwBreadcrumbComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected parseChildTemplates() {
    const templates = this.querySelectorAll("template");
    if (templates.length === 0) return;

    const items: BreadcrumbItem[] = [];
    templates.forEach((tmpl) => {
      const label = tmpl.getAttribute("label") || "";
      const href = tmpl.getAttribute("href") || undefined;
      const active = tmpl.hasAttribute("active");
      if (label) {
        items.push({ label, href, active });
      }
    });
    if (items.length > 0) {
      this.scope.items = items;
    }
    this.computeItemModes();
  }

  protected computeItemModes() {
    for (const item of this.scope.items) {
      if (item.active) {
        item.mode = "active";
      } else if (item.href) {
        item.mode = "link";
      } else {
        item.mode = "plain";
      }
    }
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
    if (attributeName === "items" && typeof newValue === "string") {
      try {
        this.scope.items = JSON.parse(newValue);
        this.computeItemModes();
      } catch {
        // Ignore parse errors
      }
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
