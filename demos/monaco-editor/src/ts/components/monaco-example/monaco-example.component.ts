import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import pugTemplate from "./monaco-example.component.pug";

export class MonacoExampleComponent extends Component {
  public static tagName = "monaco-example";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope = {
    article: {
      title: "PinePhone: What You Need to Know About This Linux Phone",
      body_html: "",
    },
    save: this.save,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  public save() {
    console.log("Clicked save!");
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
    this.scope.article.body_html = this.el.innerHTML;
  }

  protected requiredAttributes() {
    return [];
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this.el)) {
      // console.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      // console.debug('Use template', template);
      return pugTemplate(this.scope);
    }
  }
}
