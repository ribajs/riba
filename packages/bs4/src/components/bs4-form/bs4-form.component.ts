import { Component, HttpService, HttpMethod, HttpDataType } from "@ribajs/core";
import template from "./bs4-form.component.html";
import { stripHtml } from "@ribajs/utils/src/type";
import { getUID, hasChildNodesTrim } from "@ribajs/utils/src/dom";

export interface ValidationObject {
  fields:
    | {
        [name: string]: string | boolean | string[];
      }
    | FormData;
  valid: boolean;
  error?: string;
}

export interface SubmitSettings {
  action: string;
  method: HttpMethod;
  target?: string;
  type: HttpDataType;
}

export interface Scope {
  id: string;
  form: ValidationObject;
  onSubmit: Bs4FormComponent["onSubmit"];

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
  public _debug = false;
  protected autobind = true;

  static get observedAttributes() {
    return [
      "id",
      "disable-submit-until-change",
      "use-ajax",
      "ajax-request-type",
      "auto-set-form-data",
      "strip-html",
    ];
  }

  protected formEl: HTMLFormElement | null = null;

  protected getDefaultScope(): Scope {
    const scope: Scope = {
      id: getUID("form"),

      form: {
        fields: {},
        valid: false,
        error: undefined,
      },

      disableSubmitUntilChange: false,

      submitDisabled: false,
      onSubmit: this.onSubmit,

      useAjax: true,
      ajaxRequestType: "form",
      autoSetFormData: true,
      stripHtml: true,
    };
    return scope;
  }

  protected scope: Scope = this.getDefaultScope();

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4FormComponent.observedAttributes);
    this.addEventListeners();
  }

  protected addEventListeners() {
    if (this.scope.disableSubmitUntilChange) {
      this.el.addEventListener("input", () => {
        this.scope.submitDisabled = false;
      });
    }
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async beforeBind() {
    super.beforeBind();
    this.el.id = this.scope.id;
  }

  protected async afterBind() {
    super.afterBind();
  }

  protected stripHtml() {
    for (const key in this.scope.form.fields) {
      if (
        (this.scope.form.fields as any)[key] &&
        typeof (this.scope.form.fields as any)[key] === "string"
      ) {
        (this.scope.form.fields as any)[key] = stripHtml(
          (this.scope.form.fields as any)[key] as string
        );
      }
    }
  }

  public onSubmit(event: Event, el: HTMLButtonElement) {
    this.debug("onSubmit", event, el);
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

    const submitSettings = this.getSubmitSettings(event);
    if (submitSettings?.target === "_blank") {
      return true;
    }

    if (this.scope.useAjax) {
      // stop native submit because we submit the data using javascript
      event.preventDefault();
      event.stopPropagation();

      this.ajaxSubmit(event, el);
    }
  }

  /**
   * TODO Not tested in the wild, may need to be adjusted. Also the error handling is untested
   */
  protected ajaxSubmit(event?: Event, el?: HTMLButtonElement) {
    this.debug("onSubmit", event, el, this.scope);
    const submitSettings = this.getSubmitSettings(event);
    if (!submitSettings) {
      console.warn("Can't get submit settings");
      return;
    }

    const data = this.getFormValues();

    // This method is untested in the wild
    HttpService.fetch(
      submitSettings.action,
      submitSettings.method,
      data,
      submitSettings.type
    )
      .then((res) => {
        const message = res.body && res.body.message ? res.body.message : "";
        if (Number(res.status) >= 400) {
          // TODO generate message by status
          this.onErrorSubmit(res.status, message, res.body);
        }
        this.onSuccessSubmit(res.status, message, res.body);
      })
      .catch((err) => {
        console.error(err);
        //
        this.onErrorSubmit(err.status, err.body.message, err.body);
      });
  }

  protected getSubmitSettings(event?: Event) {
    if (!this.formEl) {
      console.warn("No form found");
      return null;
    }

    let action = this.formEl.action;
    let method = this.formEl.method;
    let target = this.formEl.method;

    // Overwrite action by formaction attribute: <button type="submit" formaction="/foobar">

    // TODO submitter from vanilla event

    // If this is a jquery event
    if ((event as any)?.originalEvent?.submitter) {
      const submitter = (event as any)?.originalEvent?.submitter;
      action = submitter?.formAction || action;
      method = submitter?.formMethod || method;
      target = submitter?.formTarget || target;
    }

    const settings: SubmitSettings = {
      action,
      method: method.toUpperCase() as HttpMethod,
      target,
      type: this.scope.ajaxRequestType,
    };

    return settings;
  }

  protected onErrorSubmit(status: string, message: string, response: any) {
    this.debug("onErrorSubmit");
    this.el.dispatchEvent(
      new CustomEvent("submit-error", {
        detail: { status, message: message, response },
      })
    );
  }

  protected onSuccessSubmit(status: string, message: string, response: any) {
    this.debug("onSuccessSubmit");
    if (this.scope.disableSubmitUntilChange) {
      this.scope.submitDisabled = true;
    }

    this.el.dispatchEvent(
      new CustomEvent("submit-success", {
        detail: { status, message: message, response },
      })
    );
  }

  protected validate(form: HTMLFormElement, validationScope: ValidationObject) {
    validationScope.valid = form.checkValidity();
    validationScope.error = form.validationMessage;
    // only show validation if we want to give a hint to the user that something is wrong
    if (!validationScope.valid) {
      this.el.dispatchEvent(new CustomEvent("validation-error"));
      form.classList.add("was-validated");
    }
  }

  protected getFormValues() {
    if (!this.formEl) {
      console.warn("No form found");
      return null;
    }
    // this.formEl.querySelectorAll("input").forEach((element) => {
    //   this.scope.form.fields[camelCase(element.name)] = getInputValue(element);
    // });
    this.scope.form.fields = new FormData(this.formEl);
    return this.scope.form.fields;
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
    if (hasChildNodesTrim(this.el)) {
      this.initForm();
      return null;
    } else {
      return template;
    }
  }
}
