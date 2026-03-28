import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import pugTemplate from "./monaco-example.component.pug";

export class MonacoExampleComponent extends Component {
  public static tagName = "monaco-example";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {
    article: {
      title: "How to use the monaco-editor from VSCode in Riba.js",
      body_html: "",
    },
    save: this.save,
  };

  constructor() {
    super();
  }

  public save() {
    console.log("Save html content: ", this.scope.article.body_html);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(MonacoExampleComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.scope.article.body_html = this.innerHTML;
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  // deconstruction
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return pugTemplate(this.scope);
    }
  }
}
