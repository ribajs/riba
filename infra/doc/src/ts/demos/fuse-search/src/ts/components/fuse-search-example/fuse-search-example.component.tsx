import { Component, TemplateFunction } from "@ribajs/core";
import { Dropdown } from "@ribajs/bs5";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

interface DropdownItem {
  label: string;
  value: any;
}

export class FuseSearchExampleComponent extends Component {
  public static tagName = "fuse-search-example";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {
    dropdownBinderLabel: "Dropdown binder",
    items: [
      {
        label: "Agahnim",
        value: 0,
      },
      {
        label: "Bongo Bongo",
        value: 1,
      },
      {
        label: "Daruk",
        value: 2,
      },
      {
        label: "Great Deku Tree",
        value: 3,
      },
      {
        label: "Hestu",
        value: 4,
      },
      {
        label: "Komali",
        value: 5,
      },
      {
        label: "Linkle",
        value: 6,
      },
      {
        label: "Maple",
        value: 7,
      },
      {
        label: "Navi",
        value: 8,
      },
      {
        label: "Zant",
        value: 9,
      },
    ] as DropdownItem[],
    selected: {
      label: "Choose a character",
      value: null,
    } as DropdownItem,
    select: this.select.bind(this),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(FuseSearchExampleComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  public select(item: DropdownItem, event: Event) {
    Dropdown.hideAll(event);
    this.scope.selected = item;
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return (
        <div class="row my-5">
          <section class="col-12 my-5">
            <h2>Fuse.js search component</h2>
            <fuse-search rv-co-items="items">
              <input
                type="search"
                class="form-control"
                placeholder="Search character..."
                aria-label="Search"
                rv-value="searchPattern"
                rv-on-input="search"
                rv-on-cut="search"
                rv-on-paste="search"
              />
              <ul class="list-group">
                <li
                  class="list-group-item list-group-item-action"
                  rv-each-item="results"
                  rv-text="item.item.label"
                ></li>
              </ul>
            </fuse-search>
          </section>
          <section class="col-12 my-5">
            <h2>Fuse.js search component in bs5-dropdown binder</h2>
            <div class="dropdown">
              <button
                class="btn btn-outline-success text-truncate dropdown-toggle"
                rv-bs5-dropdown=""
                rv-text="selected.label"
              ></button>
              <div class="dropdown-menu">
                <fuse-search rv-parent rv-co-items="items">
                  <div class="m-2">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Filter..."
                      aria-label="Filter"
                      rv-value="searchPattern"
                      rv-on-input="search"
                      rv-on-cut="search"
                      rv-on-paste="search"
                    />
                  </div>
                  <div class="scrollbar-y-scroll scrollbar-success">
                    <div rv-show="searchPattern | size" rv-each-item="results">
                      <div
                        class="dropdown-item cursor-pointer"
                        rv-on-click="$parent.$parent.select | args item.item"
                      >
                        <span
                          class="text-success"
                          rv-text="item.item.label"
                        ></span>
                      </div>
                    </div>
                    <div
                      rv-if="results | size | eq 0"
                      rv-show="searchPattern | size"
                    >
                      <div class="dropdown-item">
                        <span class="text-success">No result</span>
                      </div>
                    </div>
                    <div rv-hide="searchPattern | size" rv-each-item="items">
                      <div
                        class="dropdown-item cursor-pointer"
                        rv-on-click="$parent.$parent.select | args item"
                      >
                        <span class="text-success" rv-text="item.label"></span>
                      </div>
                    </div>
                  </div>
                </fuse-search>
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}
