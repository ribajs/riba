import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import template from "./tw-pagination.component.html?raw";

export interface PaginationPage {
  number: number;
  isEllipsis: boolean;
}

export interface Scope extends ScopeBase {
  totalPages: number;
  currentPage: number;
  maxVisible: number;
  prevLabel: string;
  nextLabel: string;
  pages: PaginationPage[];
  goToPage: TwPaginationComponent["goToPage"];
  prevPage: TwPaginationComponent["prevPage"];
  nextPage: TwPaginationComponent["nextPage"];
  hasPrev: boolean;
  hasNext: boolean;
}

export class TwPaginationComponent extends Component {
  public static tagName = "tw-pagination";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["total-pages", "current-page", "max-visible", "prev-label", "next-label"];
  }

  public scope: Scope = {
    totalPages: 1,
    currentPage: 1,
    maxVisible: 5,
    prevLabel: "Previous",
    nextLabel: "Next",
    pages: [],
    goToPage: this.goToPage.bind(this),
    prevPage: this.prevPage.bind(this),
    nextPage: this.nextPage.bind(this),
    hasPrev: false,
    hasNext: false,
  };

  constructor() {
    super();
  }

  public goToPage(_event: Event, _el: HTMLElement, page: PaginationPage) {
    if (page.isEllipsis) {
      return;
    }
    this.scope.currentPage = page.number;
    this.updatePages();
    this.dispatchEvent(
      new CustomEvent("page-changed", {
        detail: { page: this.scope.currentPage },
        bubbles: true,
      }),
    );
  }

  public prevPage() {
    if (this.scope.hasPrev) {
      this.scope.currentPage--;
      this.updatePages();
      this.dispatchEvent(
        new CustomEvent("page-changed", {
          detail: { page: this.scope.currentPage },
          bubbles: true,
        }),
      );
    }
  }

  public nextPage() {
    if (this.scope.hasNext) {
      this.scope.currentPage++;
      this.updatePages();
      this.dispatchEvent(
        new CustomEvent("page-changed", {
          detail: { page: this.scope.currentPage },
          bubbles: true,
        }),
      );
    }
  }

  protected computePages(): PaginationPage[] {
    const total = this.scope.totalPages;
    const current = this.scope.currentPage;
    const maxVisible = this.scope.maxVisible;
    const pages: PaginationPage[] = [];

    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) {
        pages.push({ number: i, isEllipsis: false });
      }
      return pages;
    }

    // Always show first page
    pages.push({ number: 1, isEllipsis: false });

    const halfVisible = Math.floor((maxVisible - 2) / 2);
    let start = Math.max(2, current - halfVisible);
    let end = Math.min(total - 1, current + halfVisible);

    // Adjust range to fill maxVisible - 2 slots (excluding first and last)
    const slotsAvailable = maxVisible - 2;
    if (end - start + 1 < slotsAvailable) {
      if (start === 2) {
        end = Math.min(total - 1, start + slotsAvailable - 1);
      } else {
        start = Math.max(2, end - slotsAvailable + 1);
      }
    }

    if (start > 2) {
      pages.push({ number: -1, isEllipsis: true });
    }

    for (let i = start; i <= end; i++) {
      pages.push({ number: i, isEllipsis: false });
    }

    if (end < total - 1) {
      pages.push({ number: -1, isEllipsis: true });
    }

    // Always show last page
    pages.push({ number: total, isEllipsis: false });

    return pages;
  }

  protected updatePages() {
    this.scope.pages = this.computePages();
    this.scope.hasPrev = this.scope.currentPage > 1;
    this.scope.hasNext = this.scope.currentPage < this.scope.totalPages;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwPaginationComponent.observedAttributes);
  }

  protected async afterBind() {
    this.updatePages();
    await super.afterBind();
  }

  protected requiredAttributes(): string[] {
    return ["total-pages"];
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
    this.updatePages();
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
