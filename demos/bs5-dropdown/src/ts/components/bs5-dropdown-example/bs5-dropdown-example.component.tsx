import { Component, TemplateFunction } from "@ribajs/core";
import { Dropdown } from "@ribajs/bs5";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

interface DropdownItem {
  label: string;
  value: any;
}

export class Bs5DropdownExampleComponent extends Component {
  public static tagName = "bs5-dropdown-example";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {
    dropdownBinderLabel: "Dropdown binder",
    items: [
      {
        label: "Click me",
        value: 0,
      },
      {
        label: "Click ME!",
        value: 1,
      },
      {
        label: "No, click ME!",
        value: 2,
      },
      {
        label: "NO, ME!!1!1",
        value: 3,
      },
      {
        label: "Select me, please",
        value: 4,
      },
      {
        label: "I do not care",
        value: 5,
      },
      {
        label: "Do what ever you want..",
        value: 6,
      },
      {
        label: "Who am I?",
        value: 7,
      },
      {
        label: "Don't click me",
        value: 8,
      },
      {
        label: "...",
        value: 9,
      },
    ] as DropdownItem[],
    selected: {
      label: "Select an item",
      value: null,
    } as DropdownItem,
    select: this.select.bind(this),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(Bs5DropdownExampleComponent.observedAttributes);
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
          <section class="col-12">
            <h1>bs5-dropdown demo</h1>
            <div class="row">
              <section class="col-12 my-5">
                <h2>bs5-dropdown component</h2>

                <bs5-dropdown rv-parent class="dropdown">
                  <a
                    rv-on-click="toggle"
                    class="btn btn-secondary dropdown-toggle me-2"
                    href="#"
                    role="button"
                    id="bs5DropdownMenuLink"
                    aria-haspopup="true"
                    aria-expanded="false"
                    rv-text="$parent.selected.label"
                  ></a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="bs5DropdownMenuLink"
                  >
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <hr class="dropdown-divider" />
                    <div class="dropdown-header">$parent.items</div>
                    <a
                      rv-each-item="$parent.items"
                      class="dropdown-item cursor-pointer"
                      rv-on-click="$parent.$parent.select | args item"
                    >
                      <span class="text-primary" rv-text="item.label"></span>
                    </a>
                  </div>
                </bs5-dropdown>

                <bs5-dropdown class="dropup">
                  <a
                    rv-on-click="toggle"
                    class="btn btn-secondary dropdown-toggle ms-2"
                    href="#"
                    role="button"
                    id="bs5DropupMenuLink"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dropup link <span rv-show="isShown">(Open)</span>
                    <span rv-hide="isShown">(Closed)</span>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="bs5DropupMenuLink">
                    <li>
                      <div class="dropdown-header">Dropdown header</div>
                    </li>
                    <li>
                      <a class="dropdown-item active" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item disabled">Disabled link</a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Separated link
                      </a>
                    </li>
                  </ul>
                </bs5-dropdown>
              </section>

              <section class="col-12 my-5">
                <h2>
                  bs5-dropdown component <br />
                  <small class="text-muted">
                    with Fuse.js search component
                  </small>
                </h2>

                <bs5-dropdown rv-parent class="dropdown">
                  <a
                    rv-on-click="toggle"
                    class="btn btn-danger dropdown-toggle"
                    href="#"
                    role="button"
                    id="bs5DropdownFuseMenuLink"
                    aria-haspopup="true"
                    aria-expanded="false"
                    rv-text="$parent.selected.label"
                  ></a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="bs5DropdownFuseMenuLink"
                  >
                    <fuse-search rv-parent rv-co-items="$parent.items">
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
                      <div class="scrollbar-y-scroll scrollbar-danger">
                        <div
                          rv-show="searchPattern | size"
                          rv-each-item="results"
                          class="dropdown-item cursor-pointer"
                          rv-on-click="$parent.$parent.$parent.select | args item.item"
                        >
                          <span
                            class="text-danger"
                            rv-text="item.item.label"
                          ></span>
                        </div>
                        <div
                          rv-if="results | size | eq 0"
                          rv-show="searchPattern | size"
                          class="dropdown-item"
                        >
                          <span class="text-danger"> No result</span>
                        </div>
                        <div
                          rv-hide="searchPattern | size"
                          rv-each-item="items"
                          class="dropdown-item cursor-pointer"
                          rv-on-click="$parent.$parent.$parent.select | args item"
                        >
                          <span class="text-danger" rv-text="item.label"></span>
                        </div>
                      </div>
                    </fuse-search>
                  </div>
                </bs5-dropdown>
              </section>

              <section class="col-12 my-5">
                <h2>bs5-dropdown binder</h2>

                <div class="dropdown">
                  <button
                    class="btn btn-outline-primary text-truncate dropdown-toggle"
                    rv-bs5-dropdown=""
                    rv-text="selected.label"
                    id="bs5DropdownBinderLink"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></button>
                  <ul
                    class="dropdown-menu scrollbar-y-scroll scrollbar-primary"
                    aria-labelledby="bs5DropdownBinderLink"
                  >
                    <li
                      rv-each-item="items"
                      class="dropdown-item cursor-pointer"
                      rv-on-click="select | args item"
                    >
                      <span class="text-primary" rv-text="item.label"></span>
                    </li>
                  </ul>
                </div>
              </section>

              <section class="col-12 my-5">
                <h2>
                  bs5-dropdown binder <br />
                  <small class="text-muted">
                    with Fuse.js search component
                  </small>
                </h2>

                <div class="dropdown">
                  <button
                    class="btn btn-outline-success text-truncate dropdown-toggle"
                    rv-bs5-dropdown=""
                    rv-text="selected.label"
                    id="bs5DropdownFuseBinderLink"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="bs5DropdownFuseBinderLink"
                  >
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
                        <div
                          rv-show="searchPattern | size"
                          rv-each-item="results"
                          class="dropdown-item cursor-pointer"
                          rv-on-click="$parent.$parent.select | args item.item"
                        >
                          <span
                            class="text-success"
                            rv-text="item.item.label"
                          ></span>
                        </div>
                        <div
                          rv-if="results | size | eq 0"
                          rv-show="searchPattern | size"
                          class="dropdown-item"
                        >
                          <span class="text-success"> No result</span>
                        </div>
                        <div
                          rv-hide="searchPattern | size"
                          rv-each-item="items"
                          class="dropdown-item cursor-pointer"
                          rv-on-click="$parent.$parent.select | args item"
                        >
                          <span
                            class="text-success"
                            rv-text="item.label"
                          ></span>
                        </div>
                      </div>
                    </fuse-search>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      );
    }
  }
}
