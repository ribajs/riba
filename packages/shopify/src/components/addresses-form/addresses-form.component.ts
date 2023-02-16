import { Component, HttpService, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

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

interface Scope extends ScopeBase {
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

  static get observedAttributes(): string[] {
    return [];
  }

  protected editAddressForm: HTMLFormElement | null = null;
  protected createAddressForm: HTMLFormElement | null = null;

  public scope: Scope = {
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

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyAddressesComponent.observedAttributes);
  }

  public edit(id: string, event: Event) {
    const form = this.querySelector(
      `form[action="/account/addresses/${id}]`
    ) as HTMLFormElement;

    if (!form) {
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(form, this.scope.editAddress[id].validation);

    if (this.scope.editAddress[id].validation.valid) {
      form.submit();
    }
  }

  /**
   * Submit an new address
   */
  public create(event: Event) {
    if (!this.createAddressForm) {
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(this.createAddressForm, this.scope.createAddress.validation);

    if (this.scope.createAddress.validation.valid) {
      this.createAddressForm.submit();
    }
  }

  // https://help.shopify.com/en/api/reference/customers/customer_address
  // /account/addresses/{id}
  public async delete(id: string) {
    try {
      await HttpService.delete(`/account/addresses/${id}`, {}, "json");
      location.reload();
    } catch (error) {
      console.error("delete error", error);
      location.reload();
    }
  }

  protected initValidation() {
    this.editAddressForm = this.querySelector(
      'form[action^="/account/addresses/"]'
    ) as HTMLFormElement;
    this.editAddressForm.attr("novalidate", "");
    this.editAddressForm.addClass("needs-validation");

    this.createAddressForm = this.querySelector(
      'form[action="/account/addresses"]'
    ) as HTMLFormElement;
    this.createAddressForm.attr("novalidate", "");
    this.createAddressForm.addClass("needs-validation");
  }

  protected validate(form: HTMLFormElement, validationScope: ValidationObject) {
    validationScope.valid = form.checkValidity();
    form.classList.add("was-validated");
  }

  protected async afterBind() {
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
      const { default: template } = await import(
        "./addresses-form.component.html?raw"
      );
      return template;
    }
  }
}
