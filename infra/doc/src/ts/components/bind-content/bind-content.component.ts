import { Component } from "@ribajs/core";

export class BindContentComponent extends Component {
  public static tagName = "rv-bind-content";

  protected content = "";
  protected isBound = false;

  public scope = {};
  protected autobind = false;

  constructor() {
    super();
    this.bindContent = this.bindContent.bind(this);
  }

  public bindContent() {
    if (this.isBound) {
      return;
    }
    this.isBound = true;
    this.classList.add("bound");
    // Content comes from the component's own <template> child (trusted build-time content)
    this.innerHTML = this.content;
    this.removeEventListener("click", this.bindContent);
    // No need to call this.bind() here - custom elements inside the content
    // (like rv-example-tabs) are pre-registered and handle their own lifecycle
    // via connectedCallback() when inserted into the DOM.
  }

  protected connectedCallback() {
    if (this.isBound) {
      return;
    }
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
