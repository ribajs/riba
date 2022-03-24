import {
  Component,
  TemplateFunction,
  HttpService,
  HttpMethod,
  HttpDataType,
  ScopeBase,
} from "@ribajs/core";
import template from "./bs5-form.component.html";
import { stripHtml } from "@ribajs/utils/src/type.js";
import {
  getUID,
  hasChildNodesTrim,
  scrollTo,
  getViewportDimensions,
} from "@ribajs/utils/src/dom.js";

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

export interface Scope extends ScopeBase {
  id: string;
  form: ValidationObject;
  onSubmit: Bs5FormComponent["onSubmit"];

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
  scrollToInvalidElement: true;
  animateInvalidElement: true;
}

export class Bs5FormComponent extends Component {
  public static tagName = "bs5-form";
  public _debug = false;
  protected autobind = true;

  static get observedAttributes(): string[] {
    return [
      "id",
      "disable-submit-until-change",
      "use-ajax",
      "ajax-request-type",
      "auto-set-form-data",
      "strip-html",
      "scroll-invalid-element",
      "animate-invalid-element",
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
      scrollToInvalidElement: true,
      animateInvalidElement: true,
    };
    return scope;
  }

  public scope: Scope = this.getDefaultScope();

  constructor() {
    super();
    this.enableSubmit = this.enableSubmit.bind(this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5FormComponent.observedAttributes);
    this.addEventListeners();
  }

  protected addEventListeners() {
    if (this.scope.disableSubmitUntilChange) {
      this.addEventListener("input", this.enableSubmit);
    }
  }

  protected removeEventListeners() {
    this.removeEventListener("input", this.enableSubmit);
  }

  private enableSubmit() {
    this.scope.submitDisabled = false;
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.id = this.scope.id;
  }

  protected async afterBind() {
    await super.afterBind();
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
      this.onInvalidForm(event);
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
  protected async ajaxSubmit(event?: Event, el?: HTMLButtonElement) {
    this.debug("onSubmit", event, el, this.scope);
    const submitSettings = this.getSubmitSettings(event);
    if (!submitSettings) {
      console.warn("Can't get submit settings");
      return;
    }

    if (this.scope.autoSetFormData) {
      this.getFormValues();
    }

    try {
      // This method is untested in the wild
      const res = await HttpService.fetch(
        submitSettings.action,
        submitSettings.method,
        this.scope.form.fields,
        submitSettings.type
      );

      if (!res || !res.body) {
        return this.onErrorSubmit("500", "Error", "Empty body!");
      }

      const message = res.body && res.body.message ? res.body.message : "";
      if (Number(res.status) >= 400) {
        // TODO generate message by status
        this.onErrorSubmit(res.status.toString(), message, res.body);
      }
      return this.onSuccessSubmit(res.status.toString(), message, res.body);
    } catch (err: any) {
      if (err.status && err.body) {
        this.onErrorSubmit(err.status, err.body.message, err.body);
      } else {
        throw this.error;
      }
    }
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

  protected onInvalidForm(event: Event): void {
    this.debug("Form not valid", this.scope);
    // stop native submit
    event.preventDefault();
    event.stopPropagation();
    if (!this.formEl) {
      console.warn("No form found");
      return;
    }
    const invalidElements =
      this.formEl.querySelectorAll<HTMLElement>(":invalid");
    if (invalidElements && invalidElements.length) {
      const invalidElement = invalidElements[0];
      if (this.scope.scrollToInvalidElement) {
        this.scrollToElement(invalidElement);
      }
      if (this.scope.animateInvalidElement) {
        this.scrollToElement(invalidElement);
      }
    }

    this.dispatchEvent(
      new CustomEvent("invalid", {
        detail: { elements: invalidElements },
      })
    );
  }

  protected scrollToElement(invalidElement: HTMLElement) {
    const vp = getViewportDimensions();
    const offset = vp.h / 2;
    scrollTo(invalidElement, offset, window);
    this.animateInvalidElement(invalidElement);
  }

  protected animateInvalidElement(invalidElement: HTMLElement, endsOn = 3000) {
    invalidElement.classList.add("invalid-flashing-animation");
    setTimeout(() => {
      invalidElement.classList.remove("invalid-flashing-animation");
    }, endsOn);
  }

  protected onErrorSubmit(status: string, message: string, response: any) {
    this.debug("onErrorSubmit");
    this.dispatchEvent(
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

    this.dispatchEvent(
      new CustomEvent("submit-success", {
        detail: { status, message: message, response },
      })
    );
  }

  protected validate(
    form: HTMLFormElement,
    validationScope: ValidationObject,
    errorEventName = "validation-error"
  ) {
    validationScope.valid = form.checkValidity();
    validationScope.error = form.validationMessage;
    // only show validation if we want to give a hint to the user that something is wrong
    if (!validationScope.valid) {
      this.dispatchEvent(new CustomEvent(errorEventName));
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
    const formEl = this.querySelector("form");
    if (formEl && formEl.length > 0) {
      this.formEl = formEl;
      this.formEl.classList.add("needs-validation");
      this.formEl.setAttribute("novalidate", "");
    } else {
      console.warn("bs5 form without children found");
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    if (hasChildNodesTrim(this)) {
      this.initForm();
      return null;
    } else {
      return template;
    }
  }
}
