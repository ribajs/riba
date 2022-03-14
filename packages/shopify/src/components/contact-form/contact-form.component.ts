import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import template from "./contact-form.component.html";
import { selectAll, hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { stripHtml } from "@ribajs/utils/src/type.js";

// TODO move to general validation component class we can extend from
export interface ValidationObject {
  fields: {
    [name: string]: string;
  };
  valid: boolean;
  error?: string;
}

interface Scope {
  form: ValidationObject;
  send: ShopifyContactFormComponent["send"];
  selectAll: ShopifyContactFormComponent["selectAll"];
}

export class ShopifyContactFormComponent extends Component {
  public static tagName = "shopify-contact-form";

  static get observedAttributes(): string[] {
    return [];
  }

  protected form?: HTMLFormElement;

  public scope: Scope = {
    form: {
      fields: {
        firstName: "",
        lastName: "",
        fullName: "",
        company: "",
        phone: "",
        email: "",
        message: "",
      },
      valid: false,
      error: undefined,
    },
    /** send form function */
    send: this.send,
    /** select all text function */
    selectAll: this.selectAll,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyContactFormComponent.observedAttributes);
  }

  /**
   * Send the contact form using a form submit request with best shopify form support
   */
  public send(event: Event) {
    for (const key in this.scope.form.fields) {
      if (this.scope.form.fields[key]) {
        this.scope.form.fields[key] = stripHtml(this.scope.form.fields[key]);
      }
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    if (!this.form) {
      return false;
    }

    this.validate(this.form, this.scope.form);

    if (this.scope.form.valid) {
      this.form.submit();
    }
  }

  public selectAll(event: Event, scope: any, eventEl: HTMLInputElement) {
    selectAll(eventEl);
  }

  protected validate(form: HTMLFormElement, validationScope: ValidationObject) {
    validationScope.valid = form.checkValidity();
    validationScope.error = form.validationMessage;
    form.classList.add("was-validated");
  }

  protected async beforeBind() {
    this.form = this.getElementsByTagName("form")[0];

    // For custom style form validation, see https://getbootstrap.com/docs/4.1/components/forms/#custom-styles
    this.form.classList.add("needs-validation");
    this.form.setAttribute("novalidate", "");
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (this && hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
