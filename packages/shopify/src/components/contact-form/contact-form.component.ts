import { Component } from "@ribajs/core";
import template from "./contact-form.component.html";
import { selectAll } from "@ribajs/utils/src/dom";
import { stripHtml } from "@ribajs/utils/src/type";

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

  static get observedAttributes() {
    return [];
  }

  protected form?: HTMLFormElement;

  protected scope: Scope = {
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

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyContactFormComponent.observedAttributes);
  }

  /**
   * Send the contact form using a form submit request with best shopify form support
   */
  public send(event: Event) {
    // console.debug('send', this.scope, event);

    for (const key in this.scope.form.fields) {
      if (this.scope.form.fields[key]) {
        this.scope.form.fields[key] = stripHtml(this.scope.form.fields[key]);
      }
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    if (!this.form) {
      // console.debug('No form found');
      return false;
    }

    this.validate(this.form, this.scope.form);

    if (this.scope.form.valid) {
      this.form.submit();
    } else {
      // console.debug('form not valid', this.scope);
    }
  }

  public selectAll(event: Event, scope: any, eventEl: HTMLInputElement) {
    // console.debug('selectAll');
    selectAll(eventEl);
  }

  protected validate(form: HTMLFormElement, validationScope: ValidationObject) {
    validationScope.valid = form.checkValidity();
    validationScope.error = form.validationMessage;
    form.classList.add("was-validated");
  }

  protected async beforeBind() {
    // console.debug('before');
    this.form = this.el.getElementsByTagName("form")[0];

    // For custom style form validation, see https://getbootstrap.com/docs/4.1/components/forms/#custom-styles
    this.form.classList.add("needs-validation");
    this.form.setAttribute("novalidate", "");
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el && this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
