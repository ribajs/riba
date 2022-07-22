import { Component } from "@ribajs/core";

export class I18nStaticExampleComponent extends Component {
  public static tagName = "rv-i18n-static-example";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(I18nStaticExampleComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async template() {
    const { default: template } = await import(
      "./i18n-static-example.component.html"
    );
    return template;
  }
}
