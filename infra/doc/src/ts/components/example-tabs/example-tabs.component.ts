import { Component, ScopeBase } from "@ribajs/core";
import { escapeHtml } from "@ribajs/utils/src/type.js";
import * as Prism from "prismjs";

export interface Tab {
  title: string;
  handle: string;
  content: string;
  type: string;
  active: boolean;
  standaloneUrl?: string;
}

export interface Scope extends ScopeBase {
  items: Tab[];
  handle: string;
  activate: ExampleTabsComponent["activate"];
}

/**
 * Standalone tab component for documentation examples.
 * Extends Component directly to avoid the async race conditions
 * in the TemplatesComponent -> Bs5TabsComponent inheritance chain.
 */
export class ExampleTabsComponent extends Component {
  public static tagName = "rv-example-tabs";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["handle", "demo-url", "standalone-url"];
  }

  public scope: Scope = {
    items: [],
    handle: "",
    activate: this.activate.bind(this),
  };

  constructor() {
    super();
  }

  /**
   * Activate a tab by setting it as active and deactivating all others.
   */
  public activate(tab: Tab) {
    for (const item of this.scope.items) {
      item.active = false;
    }
    tab.active = true;

    if (tab.type === "realtime-result") {
      const previewElement = this.querySelector(".tab-content-preview");
      if (previewElement) {
        // Build-time trusted template content from demos
        tab.content = `<pre class="language-html"><code class="language-html">${escapeHtml(
          previewElement.innerHTML.trim(),
        )}</code></pre>`;
        Prism.highlightAll();
      }
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.extractTemplates();
    this.init(ExampleTabsComponent.observedAttributes);
  }

  /**
   * Extract <template> children into scope.items, then remove them from DOM.
   * Handles both regular templates (type="source"/"preview"/"info")
   * and "single-html-file" templates that auto-generate Source/Preview/Rendered tabs.
   */
  private extractTemplates() {
    const templates = this.querySelectorAll<HTMLTemplateElement>("template");

    for (let i = 0; i < templates.length; i++) {
      const tpl = templates[i];
      const type = tpl.getAttribute("type") || "source";
      const title = tpl.getAttribute("title") || type;

      if (type === "single-html-file") {
        const sourceCode = this.removeIndentsOfSource(tpl.innerHTML);

        this.scope.items.push({
          title: "Source",
          handle: "source",
          type: "source",
          // Build-time demo source code, escaped for display
          content: `<pre class="language-html"><code class="language-html">${escapeHtml(sourceCode)}</code></pre>`,
          active: this.scope.items.length === 0,
        });

        this.scope.items.push({
          title: "Preview",
          handle: "preview",
          type: "preview",
          content: sourceCode,
          active: false,
        });

        this.scope.items.push({
          title: "Rendered",
          handle: "rendered",
          type: "realtime-result",
          content: "",
          active: false,
        });
      } else if (type === "demo") {
        const demoUrl =
          tpl.getAttribute("demo-url") || this.getAttribute("demo-url") || "";
        const standaloneUrl =
          tpl.getAttribute("standalone-url") ||
          this.getAttribute("standalone-url") ||
          demoUrl;
        const containerSelector =
          tpl.getAttribute("container-selector") || "[data-namespace]";

        const fallbackMarkup = `<div rv-view-static="{'url': '${demoUrl}', 'containerSelector': '${containerSelector}'}"></div>`;
        const sourceCode = this.removeIndentsOfSource(
          tpl.innerHTML.trim() || fallbackMarkup,
        );

        this.scope.items.push({
          title: "Source",
          handle: "source",
          type: "source",
          content: `<pre class="language-html"><code class="language-html">${escapeHtml(sourceCode)}</code></pre>`,
          active: this.scope.items.length === 0,
          standaloneUrl,
        });

        this.scope.items.push({
          title: title === "demo" ? "Preview" : title,
          handle: "preview",
          type: "preview",
          content:
            sourceCode +
            (standaloneUrl
              ? `<p class="mt-3 mb-0"><a class="btn btn-sm btn-outline-primary" href="${standaloneUrl}" target="_blank" rel="noopener">Open standalone demo</a></p>`
              : ""),
          active: false,
          standaloneUrl,
        });
      } else {
        const handle = this.handleize(title);
        this.scope.items.push({
          title,
          handle,
          type,
          content: tpl.innerHTML,
          active: this.scope.items.length === 0,
        });
      }
    }

    // Remove processed templates from DOM
    templates.forEach((tpl) => tpl.remove());
  }

  protected async afterBind() {
    Prism.highlightAll();
    await super.afterBind();
  }

  protected async template() {
    if (this.scope.items.length === 0) {
      return null;
    }
    const { default: template } = await import(
      "./example-tabs.component.html?raw"
    );
    return template;
  }

  private handleize(str: string): string {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  private countOfFirstWhitespaces(str: string): number {
    const match = str.match(/^([\s]+)/s);
    return match ? match[0].length : 0;
  }

  private removeIndentsOfSource(source: string): string {
    const lines = source.split(/\r?\n/);
    let firstLineIndents = this.countOfFirstWhitespaces(lines[0]);
    while (lines.length > 0 && firstLineIndents === lines[0].length) {
      lines.shift();
      if (lines.length === 0) break;
      firstLineIndents = this.countOfFirstWhitespaces(lines[0]);
    }
    if (firstLineIndents !== 0) {
      for (let i = 0; i < lines.length; i++) {
        const currentIndents = this.countOfFirstWhitespaces(lines[i]);
        if (currentIndents >= firstLineIndents) {
          lines[i] = lines[i].substring(firstLineIndents);
        }
      }
    }
    return lines.join("\n").trim();
  }

}
