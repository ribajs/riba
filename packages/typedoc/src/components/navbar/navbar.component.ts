import { Component, TemplateFunction } from "@ribajs/core/src/index.js";

import type { NavbarComponentScope } from "../../types/index.js";
import type { Bs5SidebarComponent } from "@ribajs/bs5";
import { SearchComponent } from "../search/search.component.js";

export class NavbarComponent extends Component {
  public static tagName = "tsd-navbar";

  static get observedAttributes() {
    return [];
  }

  public scope: NavbarComponentScope = {
    searchHasFocus: false,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(NavbarComponent.observedAttributes);
  }

  protected async afterAllBind() {
    const sidebarEls = document.getElementsByTagName(
      "bs5-sidebar"
    ) as HTMLCollectionOf<Bs5SidebarComponent>;
    const sidebar = sidebarEls.item(0);
    if (sidebar) {
      sidebar.style.marginTop = this.offsetHeight + "px";
      sidebar.style.maxHeight = `calc(100vh - ${this.offsetHeight}px)`;
    }

    this.scope.searchEl =
      (this.getElementsByTagName(SearchComponent.tagName)?.item(
        0
      ) as SearchComponent | null) || undefined;

    this.scope.searchEl?.addEventListener("focus", () => {
      this.onSearchFocus();
    });

    this.scope.searchEl?.addEventListener("blur", () => {
      this.onSearchBlur();
    });
  }

  public onSearchFocus() {
    console.debug("onSearchFocus");
    this.classList.add("search-has-focus");
    this.scope.searchHasFocus = true;
  }

  public onSearchBlur() {
    this.classList.remove("search-has-focus");
    this.scope.searchHasFocus = false;
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
