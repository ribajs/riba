import { Component, EventDispatcher } from "@ribajs/core";
import Toast from "@ribajs/bs4/src/interfaces";
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
  showSuccessToast: boolean;
  successToastChannel: string;
  successToastMessage: string;
  successToastTitle?: string;
  disableSubmitUntilChange: boolean;
  submitDisabled: boolean;
  clearOnSubmit: boolean;
}

export class Bs4FormComponent extends Component {
  public static tagName = "bs4-form";

  protected autobind = true;

  static get observedAttributes() {
    return [
      "show-success-toast",
      "success-toast-channel",
      "success-toast-message",
      "success-toast-title",
      "disable-submit-until-change",
    ];
  }

  protected formEl: HTMLFormElement | null = null;

  protected scope: Scope = {
    form: {
      fields: {},
      valid: false,
      error: undefined,
    },

    //only used when form is not submitted. (e.g. october ajax api)
    showSuccessToast: false,
    successToastChannel: "toast",
    successToastTitle: "Notice",
    successToastMessage: "Submitted.",

    disableSubmitUntilChange: true,
    clearOnSubmit: false,

    submitDisabled: false,
    onSubmit: this.onSubmit,
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
      return;
    }

    //debug, remove once deployed
    event.preventDefault();
    event.stopPropagation();

    if (this.scope.clearOnSubmit) {
      //todo
    } else if (this.scope.disableSubmitUntilChange) {
      this.scope.submitDisabled = true;
    }

    //show notification
    if (this.scope.showSuccessToast) {
      const toast: Toast = {
        message: this.scope.successToastMessage,
        title: this.scope.successToastTitle,
        delay: 10000,
      };
      const eventDispatcher = new EventDispatcher(
        this.scope.successToastChannel
      );
      eventDispatcher.trigger("show-toast", toast);
    }
  }

  protected validate(form: HTMLFormElement, validationScope: ValidationObject) {
    validationScope.valid = form.checkValidity();
    validationScope.error = form.validationMessage;
    //only show validation if we want to give a hint to the user that something is wrong
    if (!validationScope.valid) {
      form.classList.add("was-validated");
    }
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
