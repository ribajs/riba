import { Component } from "@ribajs/core";

export class BindContentComponent extends Component {
  public static tagName = "rv-bind-content";

  protected content = "";

  public scope = {};
  protected autobind = false;

  constructor() {
    super();
  }

  public bindContent() {
    this.classList.add("bound");
    this.innerHTML = this.content;
    this.removeEventListener("click", this.bindContent);
    this.bind();
  }

  protected connectedCallback() {
    this.addEventListener("click", this.bindContent);
    this.init([]);
  }

  protected async template() {
    const firstElementChild = this.firstElementChild;
    if (!firstElementChild || firstElementChild.tagName !== "TEMPLATE") {
      console.error("The child element must be a template");
      return null;
    }
    this.content = firstElementChild.innerHTML;

    const { default: template } = await import(
      "./bind-content.component.html?raw"
    );

    return template;
  }
}
