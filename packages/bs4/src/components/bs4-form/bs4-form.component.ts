import { Bs4ContentsComponent, Scope as Bs4ContentsComponentScope } from "../bs4-contents/bs4-contents.component";

import template from "./bs4-form.component.html";
import { stripHtml } from "@ribajs/utils/src/type";

export interface ValidationObject {
  fields: {
    [name: string]: string;
  };
  valid: boolean;
  error?: string;
}

export interface Scope extends Bs4ContentsComponentScope {
  form: ValidationObject;
  onSubmit: Bs4ContentsComponent["onSubmit"];
}

export class Bs4FormComponent extends Bs4ContentsComponent {
  public static tagName = "bs4-form";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected form?: HTMLFormElement;

  protected scope: Scope = {
    form: {
      fields: {},
      valid: false,
      error: undefined,
    },
    onSubmit: this.onSubmit,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4FormComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return [];
  }

  public onSubmit(event: Event) {
    for (const key in this.scope.form.fields) {
      if (this.scope.form.fields[key]) {
        this.scope.form.fields[key] = stripHtml(this.scope.form.fields[key]);
      }
    }

    if (!this.form) {
      console.warn("No form found");
      return false;
    }

    this.validate(this.form, this.scope.form);

    if (!this.scope.form.valid) {
      console.info("form not valid", this.scope);
      // stop native submit
      event.preventDefault();
      event.stopPropagation();
    }
  }
  protected validate(form: HTMLFormElement, validationScope: ValidationObject) {
    validationScope.valid = form.checkValidity();
    validationScope.error = form.validationMessage;
    form.classList.add("was-validated");
  }

  protected template() {
    if (this.el.hasChildNodes()) {
      if (this.el.querySelector("form").length === 0) {
        console.warn("bs4 form without children found");
      } else {
        this.form = this.el.querySelector("form");
        this.form.classList.add("needs-validation");
        this.form.setAttribute("novalidate", "");
        this.form.querySelectorAll("input").forEach((element) => {
          this.scope.form.fields[element.name] = element.type;
        });
      }
      return null;
    } else {
      return template;
    }
  }
}
