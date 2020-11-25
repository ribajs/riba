import { Component } from "@ribajs/core";
import template from "./login-form.component.html";

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
  login: ShopifyLoginFormComponent["login"];
  create: ShopifyLoginFormComponent["create"];
  recover: ShopifyLoginFormComponent["recover"];
  recoverBack: ShopifyLoginFormComponent["recoverBack"];
}

export class ShopifyLoginFormComponent extends Component {
  public static tagName = "shopify-login-form";

  static get observedAttributes() {
    return [];
  }

  protected loginCustomerForm: HTMLFormElement | null = null;
  protected createCustomerForm: HTMLFormElement | null = null;
  protected recoverCustomerForm: HTMLFormElement | null = null;

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
    login: this.login,
    create: this.create,
    recover: this.recover,
    recoverBack: this.recoverBack,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyLoginFormComponent.observedAttributes);
  }

  /**
   * Login submit using the login form
   */
  public login(event: Event) {
    // console.debug('login', this.scope.form);

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
    } else {
      // console.debug('form not valid', this.scope.form);
    }
  }

  /**
   * Create an account submit using the login form
   */
  public create(event: Event) {
    // console.debug('create', this.scope.form);

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
    } else {
      // console.debug('form not valid', this.scope.form);
    }
  }

  /**
   * Reset password submit using the (hidden) reset form
   * @param event
   */
  public recover(event: Event) {
    // console.debug('recover', this.scope.form, this.recoverCustomerForm);
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
      // console.debug('form not valid', this.scope.form);
      (this.loginCustomerForm.parentNode as HTMLElement | null)?.setAttribute(
        "hidden",
        ""
      );
      (this.recoverCustomerForm
        .parentNode as HTMLElement | null)?.removeAttribute("hidden");
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
    this.createCustomerForm = this.el.querySelector(
      'form[action="/account"]'
    ) as HTMLFormElement;
    this.createCustomerForm.setAttribute("novalidate", "");
    this.createCustomerForm.classList.add("needs-validation");

    this.loginCustomerForm = this.el.querySelector(
      'form[action="/account/login"]'
    ) as HTMLFormElement;
    this.loginCustomerForm.setAttribute("novalidate", "");
    this.loginCustomerForm.classList.add("needs-validation");

    this.recoverCustomerForm = this.el.querySelector(
      'form[action="/account/recover"]'
    ) as HTMLFormElement;
    this.recoverCustomerForm.setAttribute("novalidate", "");
    this.recoverCustomerForm.classList.add("needs-validation");

    // console.debug('initValidation', this.createCustomerForm, this.loginCustomerForm, this.recoverCustomerForm);
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
