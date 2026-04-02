import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { debounce } from "@ribajs/utils/src/control";
import template from "./tw-scrollspy.component.html?raw";

export interface ScrollspyAnchor {
  element: HTMLHeadingElement;
  href: string;
  title: string;
  active: boolean;
  childs: ScrollspyAnchor[];
}

export interface TwScrollspyComponentScope {
  /** Starting header level (e.g. 2 for h2) */
  headersStart: number;
  /** Number of header levels to include (e.g. 2 means h2 and h3) */
  headersDepth: number;
  /** Depth to search parent elements for an id */
  findHeaderIdDepth: number;
  /** CSS selector for the container element that holds the headers */
  headerParentSelector?: string;
  /** Selector for a custom target element to observe scrolling on */
  target?: string;
  /** Pixel offset from top when calculating scroll position */
  offset: number;
  /** Root margin for IntersectionObserver (e.g. "0px 0px -50% 0px") */
  rootMargin: string;
  /** Pixel offset when scrolling to an anchor */
  scrollOffset: number;
  /** Array of found anchors */
  anchors: ScrollspyAnchor[];
  /** Template method: scroll to a given anchor */
  scrollToAnchor: TwScrollspyComponent["scrollToAnchor"];
}

/**
 * Watches scroll position and highlights the active navigation link
 * based on which section is currently in the viewport.
 * Uses IntersectionObserver for efficient scroll tracking.
 */
export class TwScrollspyComponent extends Component {
  public static tagName = "tw-scrollspy";

  protected autobind = true;

  protected observer?: IntersectionObserver;

  protected wrapperElement?: Element;

  protected scrollTarget?: Element | Window;

  static get observedAttributes(): string[] {
    return [
      "headers-start",
      "headers-depth",
      "find-header-id-depth",
      "header-parent-selector",
      "target",
      "offset",
      "root-margin",
      "scroll-offset",
    ];
  }

  public scope: TwScrollspyComponentScope = {
    headersStart: 2,
    headersDepth: 1,
    findHeaderIdDepth: 1,
    headerParentSelector: undefined,
    target: undefined,
    offset: 0,
    rootMargin: "0px 0px -60% 0px",
    scrollOffset: 0,
    anchors: [],
    scrollToAnchor: this.scrollToAnchor.bind(this),
  };

  constructor() {
    super();
    this._onScroll = this._onScroll.bind(this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwScrollspyComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return ["headerParentSelector"];
  }

  /**
   * Scroll to the element matching the anchor's href.
   */
  public scrollToAnchor(event: Event, scope: { href?: string } & Record<string, any>) {
    event.preventDefault();
    const href = scope.href || (event.currentTarget as HTMLAnchorElement)?.getAttribute("href");
    if (!href) return;

    const targetEl = document.querySelector(href);
    if (targetEl) {
      const top =
        targetEl.getBoundingClientRect().top +
        window.scrollY -
        this.scope.scrollOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
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
    pushTo: ScrollspyAnchor[],
  ) {
    const headerElements = wrapperElement.querySelectorAll(
      "h" + headersStart,
    ) as NodeListOf<HTMLHeadingElement>;
    headerElements.forEach((headerElement) => {
      const id = this.getIdFromElementOrParent(headerElement);
      if (!id) {
        return;
      }
      pushTo.push({
        element: headerElement,
        href: "#" + id,
        title: headerElement.textContent || headerElement.innerHTML,
        active: false,
        childs: [],
      });
      if (headerElement.parentElement && headersDepth >= headersStart + 1) {
        this.pushHeaders(
          headerElement.parentElement,
          headersStart + 1,
          headersDepth,
          pushTo[pushTo.length - 1].childs,
        );
      }
    });
  }

  protected initIntersectionObserver() {
    this.destroyObserver();

    const rootElement = this.scope.target
      ? document.querySelector(this.scope.target)
      : null;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id || entry.target.parentElement?.id;
          if (!id) continue;
          const href = "#" + id;
          this.setAnchorActive(this.scope.anchors, href, entry.isIntersecting);
        }
      },
      {
        root: rootElement,
        rootMargin: this.scope.rootMargin,
        threshold: 0,
      },
    );

    this.observeAnchors(this.scope.anchors);
  }

  protected observeAnchors(anchors: ScrollspyAnchor[]) {
    for (const anchor of anchors) {
      if (anchor.element) {
        // Observe the section element (parent with id) or the header itself
        const targetId = anchor.href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          this.observer?.observe(targetEl);
        }
      }
      if (anchor.childs.length) {
        this.observeAnchors(anchor.childs);
      }
    }
  }

  protected setAnchorActive(
    anchors: ScrollspyAnchor[],
    href: string,
    active: boolean,
  ): boolean {
    for (const anchor of anchors) {
      if (anchor.href === href) {
        anchor.active = active;
        return true;
      }
      if (anchor.childs.length) {
        const found = this.setAnchorActive(anchor.childs, href, active);
        if (found) return true;
      }
    }
    return false;
  }

  protected _onScroll() {
    this.updateActiveByScroll();
  }

  protected onScroll = debounce(this._onScroll.bind(this), 100);

  protected updateActiveByScroll() {
    if (!this.scope.anchors.length) return;

    const offset = this.scope.offset;
    let lastActiveHref: string | null = null;

    // Flatten all anchors
    const allAnchors = this.flattenAnchors(this.scope.anchors);

    for (const anchor of allAnchors) {
      const targetId = anchor.href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) continue;

      const rect = targetEl.getBoundingClientRect();
      if (rect.top - offset <= 0) {
        lastActiveHref = anchor.href;
      }
    }

    // Deactivate all, then activate the last one above the fold
    for (const anchor of allAnchors) {
      anchor.active = anchor.href === lastActiveHref;
    }
  }

  protected flattenAnchors(anchors: ScrollspyAnchor[]): ScrollspyAnchor[] {
    const result: ScrollspyAnchor[] = [];
    for (const anchor of anchors) {
      result.push(anchor);
      if (anchor.childs.length) {
        result.push(...this.flattenAnchors(anchor.childs));
      }
    }
    return result;
  }

  protected addEventListeners() {
    this.scrollTarget =
      this.scope.target
        ? document.querySelector(this.scope.target) || window
        : window;
    (this.scrollTarget as EventTarget).addEventListener(
      "scroll",
      this.onScroll,
      { passive: true },
    );
  }

  protected removeEventListeners() {
    if (this.scrollTarget) {
      (this.scrollTarget as EventTarget).removeEventListener(
        "scroll",
        this.onScroll,
      );
    }
  }

  protected destroyObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
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
          `[tw-scrollspy] No wrapper element found for selector: ${this.scope.headerParentSelector}`,
        );
        return;
      }
      this.pushHeaders(
        this.wrapperElement,
        this.scope.headersStart,
        this.scope.headersStart + this.scope.headersDepth - 1,
        this.scope.anchors,
      );
    }

    this.initIntersectionObserver();
    this.addEventListeners();

    // Set initial active state
    this.updateActiveByScroll();

    await super.afterBind();
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
  }

  protected disconnectedCallback() {
    this.removeEventListeners();
    this.destroyObserver();
    this.scope.anchors = [];
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    if (hasChildNodesTrim(this)) {
      return null;
    }
    return template;
  }
}
