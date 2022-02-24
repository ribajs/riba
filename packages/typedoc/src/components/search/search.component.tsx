import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim, debounce } from "@ribajs/utils";
import { NavbarComponent } from "../navbar/navbar.component";

import type { SearchComponentScope, SearchResult } from "../../types";

export class SearchComponent extends Component {
  public static tagName = "tsd-search";

  static get observedAttributes() {
    return ["base", "port", "hostname"];
  }

  public scope: SearchComponentScope = {
    port: 0,
    hostname: "localhost",
    base: "./",
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
      this.scope.hostname === "localhost" &&
      window.remoteSearchOptions?.hostname
    ) {
      this.scope.hostname = window.remoteSearchOptions.hostname;
    }
    if (!this.scope.port && window.remoteSearchOptions?.port) {
      this.scope.port = window.remoteSearchOptions.port;
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
    if (this.scope.preventPress) e.preventDefault();
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
    console.debug("updateResults", searchText);
    if (searchText.length < 2) {
      return;
    }

    this.scope.isLoading = true;
    this.scope.isReady = false;

    const url = new URL(window.location.toString());
    url.hostname = this.scope.hostname;
    url.port = this.scope.port.toString();
    // Perform a wildcard search
    url.pathname = `search/*${searchText}*`;
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

    this.scope.results = results;
    this.scope.isLoading = false;
    this.scope.isReady = !this.scope.isLoading && !this.scope.hasFailure;
  }

  public updateResults = debounce(async () => {
    console.debug("input");
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

  /**
   * Move the highlight within the result set.
   */
  setCurrentResult(dir: number) {
    console.debug("setCurrentResult");
    let active = this.scope.resultsEl?.querySelector(".active:not(.disabled)");
    console.debug("setCurrentResult", this.scope.resultsEl);
    if (!active) {
      active = this.scope.resultsEl?.querySelector(
        dir == 1 ? "li:first-child" : "li:last-child"
      );
      console.debug("setCurrentResult", active);
      if (active) {
        active.classList.add("active");
      }
    } else {
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
      if (link) {
        window.location.href = link.href;
      }
      this.scope.fieldEl?.blur();
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
            >
              <a
                class="tsd-kind-icon"
                rv-href="base | append item.url"
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
