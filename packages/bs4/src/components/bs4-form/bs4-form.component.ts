import {
  Component,
  EventDispatcher,
  HttpService,
  HttpMethod,
  HttpDataType,
} from "@ribajs/core";
import { Toast } from "@ribajs/bs4/src/interfaces";
import template from "./bs4-form.component.html";
import { stripHtml, camelCase } from "@ribajs/utils/src/type";
import { getInputValue } from "@ribajs/utils/src/dom";

export interface ValidationObject {
  fields: {
    [name: string]: string | boolean | string[];
  };
  valid: boolean;
  error?: string;
}

export interface SubmitSettings {
  action: string;
  method: HttpMethod;
  type: HttpDataType;
}

export interface Scope {
  form: ValidationObject;
  onSubmit: Bs4FormComponent["onSubmit"];

  showToast: boolean;
  toastChannel: string;
  successToastMessage: string;
  successToastTitle?: string;
  errorToastMessage: string;
  errorToastTitle?: string;
  disableSubmitUntilChange: boolean;
  submitDisabled: boolean;
  /**
   * Set this to `true` to submit the form using ajax.
   * Set this to `false` to use the default submit request with a page reload
   */
  useAjax: boolean;
  /**
   * Used for the ajax submit request. Default is "form" but can also be "script" | "json" | "xml" | "text" | "html" | "form".
   */
  ajaxRequestType: HttpDataType;
  /**
   * Submitted data for the ajax submit.
   *
   * Set this tp `true` if you do not want to use `rv-value` on your form elements,
   * in this case the property name is in this case the property name is determined from the name attribute:
   *
   * @example
   *   `<input name="given-name">` -> `scope.form.fields.givenName
   *
   * Set this to `false` if you if you want to use the rv-value binder,
   * in this case the property name may be different from the name attribute:
   * @example
   *  `<input name="given-name" rv-value="form.fields.name | default 'Zelda'">`
   *
   **/
  autoSetFormData: boolean;
  stripHtml: boolean;
}

export class Bs4FormComponent extends Component {
  public static tagName = "bs4-form";

  protected autobind = true;

  static get observedAttributes() {
    return [
      "show-toast",
      "toast-channel",
      "success-toast-message",
      "success-toast-title",
      "error-toast-message",
      "error-toast-title",
      "disable-submit-until-change",
      "use-ajax",
      "ajax-request-type",
      "auto-set-form-data",
      "strip-html",
    ];
  }

  protected formEl: HTMLFormElement | null = null;

  protected toastDispatcher?: EventDispatcher;

  protected scope: Scope = {
    form: {
      fields: {},
      valid: false,
      error: undefined,
    },

    //only used when form is not submitted. (e.g. october ajax api)
    showToast: false,
    toastChannel: "toast",
    successToastTitle: "Notice",
    successToastMessage: "Submitted.",
    errorToastTitle: "Error",
    errorToastMessage: "Transmission error.",

    disableSubmitUntilChange: false,

    submitDisabled: false,
    onSubmit: this.onSubmit,

    useAjax: true,
    ajaxRequestType: "form",
    autoSetFormData: true,
    stripHtml: true,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4FormComponent.observedAttributes);

    if (this.scope.disableSubmitUntilChange) {
      this.el.addEventListener("input", () => {
        this.scope.submitDisabled = false;
      });
    }
  }

  protected requiredAttributes() {
    return [];
  }

  protected async afterBind() {
    super.afterBind();
    this.toastDispatcher = new EventDispatcher(this.scope.toastChannel);
  }

  protected stripHtml() {
    for (const key in this.scope.form.fields) {
      if (
        this.scope.form.fields[key] &&
        typeof this.scope.form.fields[key] === "string"
      ) {
        this.scope.form.fields[key] = stripHtml(
          this.scope.form.fields[key] as string
        );
      }
    }
  }

  public onSubmit(event: Event) {
    if (!this.formEl) {
      console.warn("No form found");
      return false;
    }

    if (this.scope.autoSetFormData) {
      this.getFormValues();
    }
    if (this.scope.stripHtml) {
      this.stripHtml();
    }

    this.validate(this.formEl, this.scope.form);

    if (!this.scope.form.valid) {
      console.info("form not valid", this.scope);
      // stop native submit
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.scope.useAjax) {
      // stop native submit because we submit the data using javascript
      event.preventDefault();
      event.stopPropagation();

      this.ajaxSubmit();
    }
  }

  /**
   * TODO Not tested in the wild, may need to be adjusted. Also the error handling is untested
   */
  protected ajaxSubmit() {
    const submitSettings = this.getSubmitSettings();
    if (!submitSettings) {
      console.warn("Can't get submit settings");
      return;
    }
    // This method is untested in the wild
    HttpService.fetch(
      submitSettings.action,
      submitSettings.method,
      this.scope.form.fields,
      submitSettings.type
    )
      .then((res) => {
        console.debug("res", res);
        this.onSuccessSubmit(res);
      })
      .catch((err) => {
        console.error(err);
        this.onErrorSubmit(err);
      });
  }

  protected getSubmitSettings() {
    if (!this.formEl) {
      console.warn("No form found");
      return null;
    }

    const action = this.formEl.action;
    const method = this.formEl.method;

    const settings: SubmitSettings = {
      action,
      method: method.toUpperCase() as HttpMethod,
      type: this.scope.ajaxRequestType,
    };

    return settings;
  }

  protected onErrorSubmit(err?: Error) {
    this.el.dispatchEvent(
      new CustomEvent("submit-error", {
        detail: { response: err, success: true, error: false },
      })
    );

    // show notification
    if (this.scope.showToast) {
      const toast: Toast = {
        message: this.scope.errorToastMessage,
        title: this.scope.errorToastTitle,
        delay: 10000,
      };
      this.toastDispatcher?.trigger("show-toast", toast);
      console.debug("onErrorSubmit", toast, this.scope);
    }
  }

  protected onSuccessSubmit(response?: any) {
    if (this.scope.disableSubmitUntilChange) {
      this.scope.submitDisabled = true;
    }

    this.el.dispatchEvent(
      new CustomEvent("submit-success", {
        detail: { response, success: true, error: false },
      })
    );

    // show notification
    if (this.scope.showToast) {
      const toast: Toast = {
        message: this.scope.successToastMessage,
        title: this.scope.successToastTitle,
        delay: 10000,
      };
      this.toastDispatcher?.trigger("show-toast", toast);
    }
  }

  protected validate(form: HTMLFormElement, validationScope: ValidationObject) {
    validationScope.valid = form.checkValidity();
    validationScope.error = form.validationMessage;
    // only show validation if we want to give a hint to the user that something is wrong
    if (!validationScope.valid) {
      form.classList.add("was-validated");
    }
  }

  protected getFormValues() {
    if (!this.formEl) {
      console.warn("No form found");
      return null;
    }
    this.formEl.querySelectorAll("input").forEach((element) => {
      this.scope.form.fields[camelCase(element.name)] = getInputValue(element);
    });
  }

  protected initForm() {
    const formEl = this.el.querySelector("form");
    if (formEl && formEl.length > 0) {
      this.formEl = formEl;
      this.formEl.classList.add("needs-validation");
      this.formEl.setAttribute("novalidate", "");
    } else {
      console.warn("bs4 form without children found");
    }
  }

  protected template() {
    if (this.el.hasChildNodes()) {
      this.initForm();
      return null;
    } else {
      return template;
    }
  }
}
