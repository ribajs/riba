import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";

import { FormGroup } from "../../types";

import { PdfService } from "../../services/pdf.service";

import template from "./pdf-form-fields.component.html";

interface Scope {
  src: string;
  workerSrc: string;
  forms: FormGroup[];
}

export class PdfFormFieldsComponent extends Component {
  public static tagName = "pdf-form-fields";

  protected pdfService?: PdfService;

  protected autobind = true;

  static get observedAttributes() {
    return ["src", "worker-src"];
  }

  protected scope: Scope = {
    src: "",
    workerSrc: "",
    forms: [],
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PdfFormFieldsComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.pdfService = new PdfService(this.scope.workerSrc);
    const pdfForms = await this.pdfService.getPdfAnnotations(this.scope.src);
    this.scope.forms = pdfForms;
  }

  protected async afterBind() {
    await super.afterBind();
    this.debug("afterBind", this.scope);
  }

  protected requiredAttributes() {
    return ["src"];
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this.el)) {
      this.debug("Do not use template, because element has child nodes");
      return null;
    } else {
      return template;
    }
  }
}
