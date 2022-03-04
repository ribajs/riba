import { Component, TemplateFunction } from "@ribajs/core";
import markdownTemplate from "./md-example.component.md"
import type { JsxHtmlGlobalProps } from "@ribajs/jsx";

export type MdExampleProps = JsxHtmlGlobalProps;


declare global {
  namespace JSX {
    // This extends the IntrinsicElements interface defined in @ribajs/jsx
    interface IntrinsicElements {
      "md-example": MdExampleProps;
    }
  }
}

export class MdExampleComponent extends Component {
  public static tagName = "md-example";

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
    super.init(MdExampleComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    console.log("markdownTemplate", markdownTemplate);
    return markdownTemplate;
  }
}
