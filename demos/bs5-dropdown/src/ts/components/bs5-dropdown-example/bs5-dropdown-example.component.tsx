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
        value: 0
      },
      {
        label: "Click ME!",
        value: 1
      },
      {
        label: "No, click ME!",
        value: 2
      },
      {
        label: "NO, ME!!1!1",
        value: 3
      },
      {
        label: "Select me, please",
        value: 4
      },
      {
        label: "I do not care",
        value: 5
      },
      {
        label: "Do what ever you want..",
        value: 6
      },
      {
        label: "Who am I?",
        value: 7
      },
      {
        label: "Don't click me",
        value: 8
      },
      {
        label: "...",
        value: 9
      }
    ] as DropdownItem[],
    selected: {
      label: "Select an item",
      value: null
    } as DropdownItem,
    select: this.select
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

  public select(item: DropdownItem) {
    Dropdown.hideAll();
    this.scope.selected = item;
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return <div class="row my-5">
      <section class="col-12 my-5">
        <h2>bs5-dropdown component</h2>
        <bs5-dropdown class="dropdown">
          <a rv-on-click="toggle" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" aria-haspopup="true" aria-expanded="false">
            Dropdown link
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
          </div>
        </bs5-dropdown>
        <bs5-dropdown class="dropup">
          <a rv-on-click="toggle" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropupMenuLink" aria-haspopup="true" aria-expanded="false">
            Dropdown link
          </a>
          <div class="dropdown-menu" aria-labelledby="dropupMenuLink">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
          </div>
        </bs5-dropdown>
      </section>
    
      <section class="col-12 my-5">
        <h2>bs5-dropdown binder</h2>
    
          <div class="dropdown">
            <button class="btn btn-outline-dark text-truncate dropdown-toggle" rv-bs5-dropdown="" rv-text="selected.label"></button>
            <div class="dropdown-menu scrollbar-y-scroll scrollbar-primary">
                <div rv-each-item="items">
                    <div class="dropdown-item cursor-pointer" rv-on-click="select | args item"><span class="text-primary" rv-text="item.label"></span></div>
                </div>
            </div>
          </div>
    
      </section>
    </div>;
    }
  }
}
