import { Component, HttpService } from "@ribajs/core";
import template from "./addresses-form.component.html";

// TODO move to general validation component class we can extend from
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
  // form: {
  //   customer: {
  //     email: string;
  //     password: string;
  //   };
  // };

  editAddress: {
    [addressID: string]: {
      validation: ValidationObject;
    };
  };

  showFormId: string;

  createAddress: {
    validation: ValidationObject;
  };

  edit: ShopifyAddressesComponent["edit"];
  create: ShopifyAddressesComponent["create"];
  delete: ShopifyAddressesComponent["delete"];
}

export class ShopifyAddressesComponent extends Component {
  public static tagName = "shopify-addresses-form";

  static get observedAttributes() {
    return [];
  }

  protected editAddressForm: HTMLFormElement | null = null;
  protected createAddressForm: HTMLFormElement | null = null;

  protected scope: Scope = {
    createAddress: {
      validation: {
        valid: false,
      },
    },
    showFormId: "",
    editAddress: {},
    edit: this.edit,
    create: this.create,
    delete: this.delete,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyAddressesComponent.observedAttributes);
  }

  public edit(id: string, event: Event) {
    // console.debug('login', this.scope);

    const form = this.el.querySelector(
      `form[action="/account/addresses/${id}]`
    ) as HTMLFormElement;

    if (!form) {
      // console.debug('No edit address form found');
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(form, this.scope.editAddress[id].validation);

    if (this.scope.editAddress[id].validation.valid) {
      form.submit();
    } else {
      // console.debug('form not valid', this.scope);
    }
  }

  /**
   * Submit an new address
   */
  public create(event: Event) {
    // console.debug('create', this.scope);

    if (!this.createAddressForm) {
      // console.debug('No create form found');
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(this.createAddressForm, this.scope.createAddress.validation);

    if (this.scope.createAddress.validation.valid) {
      this.createAddressForm.submit();
    } else {
      // console.debug('form not valid', this.createAddressForm);
    }
  }

  // https://help.shopify.com/en/api/reference/customers/customer_address
  // /account/addresses/{id}
  public delete(id: string) {
    HttpService.delete(`/account/addresses/${id}`, {}, "json")
      .then((response: any) => {
        console.debug("delete response", response);
        location.reload();
      })
      .catch((error: any) => {
        console.debug("delete error", error);
        location.reload();
      });
  }

  protected initValidation() {
    this.editAddressForm = this.el.querySelector(
      'form[action^="/account/addresses/"]'
    ) as HTMLFormElement;
    this.editAddressForm.attr("novalidate", "");
    this.editAddressForm.addClass("needs-validation");

    this.createAddressForm = this.el.querySelector(
      'form[action="/account/addresses"]'
    ) as HTMLFormElement;
    this.createAddressForm.attr("novalidate", "");
    this.createAddressForm.addClass("needs-validation");

    // console.debug('initValidation', this.createAddressForm, this.createAddressForm);
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
