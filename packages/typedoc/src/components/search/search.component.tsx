import { Component, TemplateFunction } from "@ribajs/core";
import { Pjax } from "@ribajs/router";
import { hasChildNodesTrim, debounce, normalizeUrl } from "@ribajs/utils";
import { NavbarComponent } from "../navbar/navbar.component.js";

import type {
  SearchComponentScope,
  SearchResult,
  SearchOptions,
} from "../../types/index.js";

declare global {
  interface Window {
    remoteSearchOptions?: Partial<SearchOptions>;
  }
}

export class SearchComponent extends Component {
  public static tagName = "tsd-search";

  static get observedAttributes() {
    return ["server-base-url"];
  }

  public scope: SearchComponentScope = {
    serverBaseUrl: location.href,
    isLoading: false,
    isReady: false,
    hasFailure: false,
    results: [],
    query: "",
    preventPress: false,
    setFocus: this.setFocus,
    onBlur: this.onBlur,
    onFocus: this.onFocus,
    onInput: this.onInput,
    onKeydown: this.onKeydown,
    onKeypress: this.onKeypress,
    onSearchResultHover: this.onSearchResultHover,
    onSearchResultClick: this.onSearchResultClick,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(SearchComponent.observedAttributes);
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.initSettings();
    this.initSearch();
  }

  protected async afterBind() {
    await super.afterBind();
    this.scope.navbarEl =
      (
        document.getElementsByTagName(
          NavbarComponent.tagName
        ) as HTMLCollectionOf<NavbarComponent>
      ).item(0) || undefined;
  }

  initSettings() {
    if (
      this.scope.serverBaseUrl === location.href &&
      window.remoteSearchOptions?.serverBaseUrl
    ) {
      this.scope.serverBaseUrl = window.remoteSearchOptions.serverBaseUrl;
    }
  }

  initSearch() {
    this.initSearchHotkey();
  }

  public setFocus() {
    this.scope.fieldEl?.focus();
  }

  public hasFocus() {
    return this.scope.fieldEl?.matches(":focus");
  }

  protected onFocus() {
    this.classList.add("has-focus");
    this.dispatchEvent(new Event("focus"));
  }

  protected onBlur() {
    this.classList.remove("has-focus");
    this.dispatchEvent(new Event("blur"));
  }

  protected onInput() {
    this.updateResults();
  }

  protected onKeydown(
    e: KeyboardEvent,
    scope: SearchComponentScope,
    field: HTMLInputElement
  ) {
    this.scope.preventPress = true;

    if (e.key == "Enter") {
      this.gotoCurrentResult();
    } else if (e.key == "Escape") {
      field.blur();
    } else if (e.key == "ArrowUp") {
      this.setCurrentResult(-1);
    } else if (e.key === "ArrowDown") {
      this.setCurrentResult(1);
    } else {
      this.scope.preventPress = false;
    }
  }

  public onKeypress(e: KeyboardEvent) {
    if (this.scope.preventPress) {
      e.preventDefault();
    }
  }

  public onSearchResultHover(
    e: MouseEvent,
    scope: SearchComponentScope,
    newActive: HTMLLIElement
  ) {
    const oldActive = this.getActiveSearchResult();
    oldActive?.classList.remove("active");
    newActive.classList.add("active");
  }

  // Workaround
  public onSearchResultClick(
    e: MouseEvent | TouchEvent,
    scope: SearchComponentScope,
    el: HTMLAnchorElement
  ) {
    // Ignore right click
    if (e.type === "mousedown" && (e as MouseEvent).button !== 0) {
      return;
    }
    const anchor = el.firstChild as HTMLAnchorElement | null;
    if (anchor?.href) {
      this.goTo(anchor.href);
    }
  }

  initSearchHotkey() {
    /**
     * Start searching by pressing slash.
     */
    document.body.addEventListener("keydown", (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (!this.hasFocus() && e.key === "/") {
        this.setFocus();
        e.preventDefault();
      }
    });
  }

  protected async _updateResults() {
    this.scope.results = [];

    const searchText = this.scope.query.trim();
    if (searchText.length < 2) {
      return;
    }

    this.scope.isLoading = true;
    this.scope.isReady = false;

    const url = new URL(this.scope.serverBaseUrl);
    const separator = url.pathname.endsWith("/") ? "" : "/";

    // Perform a wildcard search
    url.pathname += `${separator}search/*${searchText}*`;
    const results: SearchResult[] = [];

    try {
      const response = await fetch(url.toString());
      results.push(...(await response.json()));
    } catch (error) {
      console.error(error);
      this.scope.isLoading = false;
      this.scope.hasFailure = true;
    }

    this.validateResult(results);
    this.transformResult(results);

    this.scope.results = results;
    this.scope.isLoading = false;
    this.scope.isReady = !this.scope.isLoading && !this.scope.hasFailure;
  }

  public updateResults = debounce(async () => {
    await this._updateResults();
  }, 500);

  protected validateResult(results: SearchResult[]) {
    for (const result of results) {
      if (typeof result.classes !== "string")
        throw new Error("Property classes must be of type string!");
      if (typeof result.name !== "string")
        throw new Error("Property name must be of type string!");
      if (typeof result.url !== "string")
        throw new Error("Property url must be of type string!");
    }
  }

  protected transformResult(results: SearchResult[]) {
    const separator = this.scope.serverBaseUrl.endsWith("/") ? "" : "/";
    for (const result of results) {
      if (!result.url.startsWith("http")) {
        result.url = this.scope.serverBaseUrl + separator + result.url;
      }
      result.url = normalizeUrl(result.url).url;
    }
  }

  getActiveSearchResult(dir = 1, fallbackByDir = false) {
    let active = this.scope.resultsEl?.querySelector(".active:not(.disabled)");
    if (fallbackByDir && !active) {
      active = this.scope.resultsEl?.querySelector(
        dir == 1 ? "li:first-child" : "li:last-child"
      );
      if (active) {
        active.classList.add("active");
      }
    }
    return active || null;
  }

  /**
   * Move the highlight within the result set.
   */
  setCurrentResult(dir: number) {
    const active = this.getActiveSearchResult(dir, true);
    if (active) {
      let rel: Element | undefined = active;
      // Tricky: We have to check that rel has an offsetParent so that users can't mark a hidden result as
      // active with the arrow keys.
      if (dir === 1) {
        do {
          rel = rel.nextElementSibling || undefined;
        } while (rel instanceof HTMLElement && rel.offsetParent == null);
      } else {
        do {
          rel = rel.previousElementSibling || undefined;
        } while (rel instanceof HTMLElement && rel.offsetParent == null);
      }

      // Restart on last or first element
      if (!rel) {
        if (dir === -1 && !active.previousElementSibling) {
          // If active element is the first, restart on the end
          rel =
            this.scope.resultsEl?.querySelector("li:last-child") || undefined;
        } else if (dir === 1 && !active.nextElementSibling) {
          // If active element is the first, restart on the last
          rel =
            this.scope.resultsEl?.querySelector("li:first-child") || undefined;
        }
      }

      if (rel) {
        active.classList.remove("active");
        rel.classList.add("active");
      }
    }
  }

  /**
   * Navigate to the highlighted result.
   */
  gotoCurrentResult() {
    let active = this.scope.resultsEl?.querySelector(".active:not(.disabled)");

    if (!active) {
      active = this.scope.resultsEl?.querySelector(
        "li:not(.disabled):first-child"
      );
    }

    if (active) {
      const link = active.querySelector("a");
      if (link?.href) {
        this.goTo(link.href);
      }
      this.scope.fieldEl?.blur();
    }
  }

  protected goTo(href: string) {
    const pjax = Pjax.getInstance("main");
    if (!pjax) {
      window.location.href = href;
    } else {
      pjax.goTo(href, false);
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return (
        <div class="hello">
          <div class="search-group flex-nowrap d-flex">
            <button
              class="btn btn-icon ps-4"
              id="tsd-search-field-addon"
              rv-on-click="setFocus"
            >
              <bs5-icon
                src="/assets/iconset/svg/icon_search2.svg"
                size={16}
                direction="left"
              ></bs5-icon>
            </button>
            <input
              class="form-control rounded-pill"
              id="tsd-search-field"
              type="search"
              aria-label="Search"
              aria-describedby="tsd-search-field-addon"
              autocomplete="off"
              spellcheck={false}
              rv-element="fieldEl"
              rv-value="query"
              rv-on-input="onInput"
              rv-on-focus="onFocus"
              rv-on-blur="onBlur"
              rv-on-keydown="onKeydown"
              rv-on-keypress="onKeypress"
            />
          </div>
          <ul
            class="list-group results card px-0 border-top-0"
            rv-if="isReady"
            rv-element="resultsEl"
          >
            <li
              class="list-group-item"
              rv-show="results | size | gt 0"
              rv-each-item="results"
              rv-add-class="item.classes"
              rv-on-mouseover="onSearchResultHover"
              rv-on-mousedown="onSearchResultClick"
              rv-on-ontouchend="onSearchResultClick"
            >
              <a
                class="tsd-kind-icon"
                rv-href="item.url"
                rv-html="item.name"
              ></a>
            </li>
            <li class="list-group-item disabled" rv-if="results | size | eq 0">
              No results...
            </li>
          </ul>
          <ul
            class="list-group results card px-0 border-top-0"
            rv-unless="isReady"
          >
            <li
              class="list-group-item disabled"
              rv-show="isLoading"
              aria-disabled="true"
            >
              Preparing remote search server...
            </li>
            <li
              class="list-group-item disabled"
              rv-show="hasFailure"
              aria-disabled="true"
            >
              The remote search server is not available
            </li>
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}
