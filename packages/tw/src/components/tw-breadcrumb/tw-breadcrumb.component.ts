import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import template from "./tw-breadcrumb.component.html?raw";

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
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
    this.init(TwBreadcrumbComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async beforeBind() {
    await super.beforeBind();
    // Parse items from <template> children if items attribute is not set
    if (this.scope.items.length === 0) {
      this.parseChildTemplates();
    }
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
      } catch {
        // Ignore parse errors
      }
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
