import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import template from "./bs5-contents.component.html";

export interface Anchor {
  element: HTMLHeadingElement;
  href: string;
  title: string;
  childs: Anchor[];
}

export interface Scope {
  /**
   * If start is `2` and depth is `2` depth starts on `h2` and ends on `h2`.
   */
  headersStart: number;
  /**
   * If start is `1` and depth is `1` only `h1` headers are detected, if depth is `2` also `h2` is detected.
   */
  headersDepth: number;
  /**
   * Depth in how many parents elements should be searched for an id for each found header element (default `1`)
   */
  findHeaderIdDepth: number;
  /**
   * Selector to search for headers insite of the element
   */
  headerParentSelector?: string;
  /**
   * Pixels to offset from top when calculating position to scroll there.
   */
  scrollOffset: number;
  /**
   * The element to scroll (default `window`)
   */
  scrollElement?: string;
  /**
   * Array of found headers / anchors
   */
  anchors: Anchor[];
}

export class Bs5ContentsComponent extends Component {
  public static tagName = "bs5-contents";

  protected autobind = true;

  protected wrapperElement?: Element;

  static get observedAttributes(): string[] {
    return [
      "headers-start",
      "headers-depth",
      "find-header-id-depth",
      "header-parent-selector",
      "scroll-offset",
      "scroll-element",
    ];
  }

  public scope: Scope = {
    headersDepth: 1,
    headersStart: 2,
    findHeaderIdDepth: 1,
    headerParentSelector: undefined,
    scrollOffset: 0,
    anchors: [],
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5ContentsComponent.observedAttributes);
  }

  protected getIdFromElementOrParent(
    element: HTMLElement,
    depth = 1
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
    pushTo: Anchor[]
  ) {
    const headerElements = wrapperElement.querySelectorAll(
      "h" + headersStart
    ) as NodeListOf<HTMLHeadingElement>;
    headerElements.forEach((headerElement) => {
      const id = this.getIdFromElementOrParent(headerElement);
      if (!id) {
        return;
      }
      pushTo.push({
        element: headerElement,
        href: "#" + id,
        title: headerElement.innerHTML,
        childs: [],
      });
      if (headerElement.parentElement && headersDepth >= headersStart + 1) {
        this.pushHeaders(
          headerElement.parentElement,
          headersStart + 1,
          headersDepth,
          pushTo[pushTo.length - 1].childs
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
        console.error("No wrapper element found!");
        return;
      }
      this.pushHeaders(
        this.wrapperElement,
        this.scope.headersStart,
        this.scope.headersDepth,
        this.scope.anchors
      );
    }
    await super.afterBind();
  }

  protected requiredAttributes(): string[] {
    return ["headersStart", "headersDepth", "headerParentSelector"];
  }

  protected async attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  // deconstruction
  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.scope.anchors = [];
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
