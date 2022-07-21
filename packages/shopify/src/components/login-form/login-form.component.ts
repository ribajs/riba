import { Component, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

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

interface Scope extends ScopeBase {
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
  login: ShopifyLoginFormComponent["login"];
  create: ShopifyLoginFormComponent["create"];
  recover: ShopifyLoginFormComponent["recover"];
  recoverBack: ShopifyLoginFormComponent["recoverBack"];
}

export class ShopifyLoginFormComponent extends Component {
  public static tagName = "shopify-login-form";

  static get observedAttributes(): string[] {
    return [];
  }

  protected loginCustomerForm: HTMLFormElement | null = null;
  protected createCustomerForm: HTMLFormElement | null = null;
  protected recoverCustomerForm: HTMLFormElement | null = null;

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
    login: this.login,
    create: this.create,
    recover: this.recover,
    recoverBack: this.recoverBack,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyLoginFormComponent.observedAttributes);
  }

  /**
   * Login submit using the login form
   */
  public login(event: Event) {
    if (!this.loginCustomerForm) {
      console.error("No login form found");
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(this.loginCustomerForm, this.scope.loginCustomer.validation);

    if (this.scope.loginCustomer.validation.valid) {
      this.loginCustomerForm.submit();
    }
  }

  /**
   * Create an account submit using the login form
   */
  public create(event: Event) {
    if (!this.createCustomerForm) {
      console.error("No create form found");
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(
      this.createCustomerForm,
      this.scope.createCustomer.validation
    );

    if (this.scope.createCustomer.validation.valid) {
      this.createCustomerForm.submit();
    }
  }

  /**
   * Reset password submit using the (hidden) reset form
   * @param event
   */
  public recover(event: Event) {
    if (!this.recoverCustomerForm) {
      console.error("No recover form found");
      return false;
    }

    if (!this.loginCustomerForm) {
      console.error("No login form found");
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(
      this.recoverCustomerForm,
      this.scope.recoverCustomer.validation
    );

    if (this.scope.recoverCustomer.validation.valid) {
      this.recoverCustomerForm.submit();
    } else {
      (this.loginCustomerForm.parentNode as HTMLElement | null)?.setAttribute(
        "hidden",
        ""
      );
      (
        this.recoverCustomerForm.parentNode as HTMLElement | null
      )?.removeAttribute("hidden");
    }
  }

  public recoverBack(event: Event) {
    if (!this.recoverCustomerForm) {
      console.error("No recover form found");
      return false;
    }

    if (!this.loginCustomerForm) {
      console.error("No login form found");
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    (this.loginCustomerForm.parentNode as HTMLElement | null)?.removeAttribute(
      "hidden"
    );
    (this.recoverCustomerForm.parentNode as HTMLElement | null)?.setAttribute(
      "hidden",
      ""
    );
  }

  protected initValidation() {
    this.createCustomerForm = this.querySelector(
      'form[action="/account"]'
    ) as HTMLFormElement;
    this.createCustomerForm.setAttribute("novalidate", "");
    this.createCustomerForm.classList.add("needs-validation");

    this.loginCustomerForm = this.querySelector(
      'form[action="/account/login"]'
    ) as HTMLFormElement;
    this.loginCustomerForm.setAttribute("novalidate", "");
    this.loginCustomerForm.classList.add("needs-validation");

    this.recoverCustomerForm = this.querySelector(
      'form[action="/account/recover"]'
    ) as HTMLFormElement;
    this.recoverCustomerForm.setAttribute("novalidate", "");
    this.recoverCustomerForm.classList.add("needs-validation");
  }

  protected validate(form: HTMLFormElement, validationScope: ValidationObject) {
    validationScope.valid = form.checkValidity();
    form.classList.add("was-validated");
  }

  protected async afterBind() {
    await super.afterBind();
    this.initValidation();
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async template() {
    // Only set the component template if there no childs already
    if (this && hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import("./login-form.component.html");
      return template;
    }
  }
}
