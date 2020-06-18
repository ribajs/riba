import { Component } from "@ribajs/core";

import template from "./bs4-form.component.html";
import { stripHtml } from "@ribajs/utils/src/type";

export interface ValidationObject {
  fields: {
    [name: string]: string;
  };
  valid: boolean;
  error?: string;
}

export interface Scope {
  form: ValidationObject;
  onSubmit: Bs4FormComponent["onSubmit"];
}

export class Bs4FormComponent extends Component {
  public static tagName = "bs4-form";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected formEl: HTMLFormElement | null = null;

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

    if (!this.formEl) {
      console.warn("No form found");
      return false;
    }

    this.validate(this.formEl, this.scope.form);

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
      const formEl = this.el.querySelector("form");
      if (formEl && formEl.length > 0) {
        this.formEl = formEl;
        this.formEl.classList.add("needs-validation");
        this.formEl.setAttribute("novalidate", "");
        this.formEl.querySelectorAll("input").forEach((element) => {
          this.scope.form.fields[element.name] = element.type;
        });
      } else {
        console.warn("bs4 form without children found");
      }
      return null;
    } else {
      return template;
    }
  }
}
