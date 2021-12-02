import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
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

  static get observedAttributes(): string[] {
    return [];
  }

  protected newCommentForm: HTMLFormElement | null = null;

  public scope: Scope = {
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

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyCommentsFormComponent.observedAttributes);
  }

  /**
   * Post comment
   */
  public post(event: Event) {
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
    }
  }

  protected initValidation() {
    this.newCommentForm = this.querySelector(
      "#comment_form"
    ) as HTMLFormElement;
    this.newCommentForm.setAttribute("novalidate", "");
    this.newCommentForm.classList.add("needs-validation");
  }

  protected validate(form: HTMLFormElement, validationScope: ValidationObject) {
    validationScope.valid = form.checkValidity();
    form.classList.add("was-validated");
  }

  protected async afterBind() {
    this.initValidation();
    await super.afterBind();
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
