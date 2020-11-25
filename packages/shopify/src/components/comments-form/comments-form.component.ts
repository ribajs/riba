import { Component } from "@ribajs/core";
import template from "./comments-form.component.html";

export interface ValidationRule {
  required: boolean;
  minlength?: number;
  maxlength?: number;
  max?: number;
  min?: number;
  error: string;
  isEmail?: boolean;
  isPhone?: boolean;
  onlyNumbers?: boolean;
}

export interface ValidationObject {
  valid: boolean;
  rules?: {
    [key: string]: ValidationRule;
  };
}

interface Scope {
  form: {
    customer: {
      email: string;
      password: string;
    };
  };
  loginCustomer: {
    validation: ValidationObject;
  };
  createCustomer: {
    validation: ValidationObject;
  };
  recoverCustomer: {
    validation: ValidationObject;
  };
  post: ShopifyCommentsFormComponent["post"];
}

export class ShopifyCommentsFormComponent extends Component {
  public static tagName = "shopify-comments-form";

  static get observedAttributes() {
    return [];
  }

  protected newCommentForm: HTMLFormElement | null = null;

  protected scope: Scope = {
    form: {
      customer: {
        email: "",
        password: "",
      },
    },
    loginCustomer: {
      validation: {
        valid: false,
      },
    },
    createCustomer: {
      validation: {
        valid: false,
      },
    },
    recoverCustomer: {
      validation: {
        valid: false,
      },
    },
    post: this.post,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyCommentsFormComponent.observedAttributes);
  }

  /**
   * Post comment
   */
  public post(event: Event) {
    // console.debug('post', this.scope.form);

    if (!this.newCommentForm) {
      console.error("No comment form found");
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(this.newCommentForm, this.scope.loginCustomer.validation);

    if (this.scope.loginCustomer.validation.valid) {
      this.newCommentForm.submit();
    } else {
      // console.debug('form not valid', this.scope.form);
    }
  }

  protected initValidation() {
    this.newCommentForm = this.el.querySelector(
      "#comment_form"
    ) as HTMLFormElement;
    this.newCommentForm.setAttribute("novalidate", "");
    this.newCommentForm.classList.add("needs-validation");
    // console.debug('initValidation', this.newCommentForm);
  }

  protected validate(form: HTMLFormElement, validationScope: ValidationObject) {
    validationScope.valid = form.checkValidity();
    form.classList.add("was-validated");
  }

  protected async beforeBind() {
    // console.debug('beforeBind');
  }

  protected async afterBind() {
    // console.debug('afterBind', this.scope);
    this.initValidation();
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
