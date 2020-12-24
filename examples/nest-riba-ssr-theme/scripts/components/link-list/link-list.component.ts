import { Component } from "@ribajs/core";

export interface Link {
  label: string;
  url: string;
}

export interface Scope {
  items: Link[];
}

export class LinkListComponent extends Component {
  public static tagName = "link-list";
  public _debug = false;
  protected autobind = true;

  scope: Scope = {
    items: [
      {
        label: "Home",
        url: "/",
      },
      {
        label: "About",
        url: "/pages/about",
      },
    ],
  };

  static get observedAttributes() {
    return [];
  }

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(LinkListComponent.observedAttributes);
  }

  protected template() {
    return null;
  }
}
