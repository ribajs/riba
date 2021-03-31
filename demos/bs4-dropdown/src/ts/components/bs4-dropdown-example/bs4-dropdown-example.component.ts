import { Component, TemplateFunction } from "@ribajs/core";
import { DropdownService } from "@ribajs/bs4";
import template from "./bs4-dropdown-example.component.html";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";

interface DropdownItem {
  label: string;
  value: unknown;
}

export class Bs4DropdownExampleComponent extends Component {
  public static tagName = "bs4-dropdown-example";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  protected scope = {
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
    select: this.select,
  };

  constructor() {
    super();
  }

  protected connectedCallback(): void {
    super.connectedCallback();
    super.init(Bs4DropdownExampleComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  public select(item: DropdownItem): void {
    DropdownService.closeAll();
    this.scope.selected = item;
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      // console.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      // console.debug('Use template', template);
      return template;
    }
  }
}
