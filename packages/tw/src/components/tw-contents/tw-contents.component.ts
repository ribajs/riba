import { Component, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export interface Anchor {
  element: HTMLHeadingElement;
  href: string;
  title: string;
  childs: Anchor[];
}

export interface Scope extends ScopeBase {
  /**
   * Heading level to start scanning from (default 2 = h2).
   */
  headersStart: number;
  /**
   * How many heading levels deep to scan (e.g. 2 means h2 and h3 when start=2).
   */
  headersDepth: number;
  /**
   * How many parent levels to search for an id attribute on each header element.
   */
  findHeaderIdDepth: number;
  /**
   * CSS selector for the container to scan for headings.
   */
  headerParentSelector?: string;
  /**
   * Pixel offset when scrolling to a heading.
   */
  scrollOffset: number;
  /**
   * The element to scroll (CSS selector). Defaults to the window.
   */
  scrollElement?: string;
  /**
   * Whether to show a toggle button to collapse/expand the TOC.
   */
  showToggle: boolean;
  /**
   * Whether the TOC is currently collapsed.
   */
  collapsed: boolean;
  /**
   * Array of found headers / anchors.
   */
  anchors: Anchor[];
  /**
   * Toggle the TOC visibility.
   */
  toggle: TwContentsComponent["toggle"];
}

export class TwContentsComponent extends Component {
  public static tagName = "tw-contents";

  protected autobind = true;
  public _debug = false;

  protected wrapperElement?: Element;

  static get observedAttributes(): string[] {
    return [
      "headers-start",
      "headers-depth",
      "find-header-id-depth",
      "header-parent-selector",
      "scroll-offset",
      "scroll-element",
      "show-toggle",
    ];
  }

  public scope: Scope = {
    headersDepth: 1,
    headersStart: 2,
    findHeaderIdDepth: 1,
    headerParentSelector: undefined,
    scrollOffset: 0,
    scrollElement: undefined,
    showToggle: false,
    collapsed: false,
    anchors: [],
    toggle: this.toggle.bind(this),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwContentsComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return ["headersStart", "headersDepth", "headerParentSelector"];
  }

  protected getIdFromElementOrParent(
    element: HTMLElement,
    depth = 1,
  ): string | null {
    if (element.id) {
      return element.id;
    }
    if (depth <= this.scope.findHeaderIdDepth) {
      if (element.parentElement) {
        return this.getIdFromElementOrParent(element.parentElement, ++depth);
      }
    }
    return null;
  }

  protected pushHeaders(
    wrapperElement: Element,
    headersStart: number,
    headersDepth: number,
    pushTo: Anchor[],
  ) {
    const headerElements = wrapperElement.querySelectorAll(
      "h" + headersStart,
    ) as NodeListOf<HTMLHeadingElement>;
    headerElements.forEach((headerElement) => {
      const id = this.getIdFromElementOrParent(headerElement);
      if (!id) {
        // Generate an id if the heading doesn't have one
        const generatedId =
          "tw-toc-" +
          headerElement.textContent
            ?.trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
        if (generatedId && generatedId !== "tw-toc-") {
          headerElement.id = generatedId;
        } else {
          return;
        }
      }
      const anchor: Anchor = {
        element: headerElement,
        href: "#" + (headerElement.id || id),
        title: headerElement.textContent?.trim() || headerElement.innerHTML,
        childs: [],
      };
      pushTo.push(anchor);
      if (headerElement.parentElement && headersDepth >= headersStart + 1) {
        this.pushHeaders(
          headerElement.parentElement,
          headersStart + 1,
          headersDepth,
          anchor.childs,
        );
      }
    });
  }

  protected async afterBind() {
    if (
      this.scope.headerParentSelector &&
      this.scope.headersStart &&
      this.scope.headersDepth
    ) {
      this.wrapperElement =
        document.querySelector(this.scope.headerParentSelector) || undefined;
      this.scope.anchors = [];
      if (!this.wrapperElement) {
        console.error(
          "tw-contents: No element found for selector",
          this.scope.headerParentSelector,
        );
        return;
      }
      this.pushHeaders(
        this.wrapperElement,
        this.scope.headersStart,
        this.scope.headersDepth,
        this.scope.anchors,
      );
    }
    await super.afterBind();
  }

  public toggle() {
    this.scope.collapsed = !this.scope.collapsed;
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.scope.anchors = [];
  }

  protected async template() {
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: tpl } = await import(
        "./tw-contents.component.html?raw"
      );
      return tpl;
    }
  }
}
