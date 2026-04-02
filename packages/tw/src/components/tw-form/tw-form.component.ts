import {
  Component,
  HttpService,
  HttpMethod,
  HttpDataType,
  ScopeBase,
} from "@ribajs/core";
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
  onSubmit: TwFormComponent["onSubmit"];
  onReset: TwFormComponent["onReset"];

  disableSubmitUntilChange: boolean;
  submitDisabled: boolean;
  /**
   * Set this to `true` to submit the form using ajax.
   * Set this to `false` to use the default submit request with a page reload.
   */
  useAjax: boolean;
  /**
   * Used for the ajax submit request. Default is "form" but can also be "script" | "json" | "xml" | "text" | "html" | "form".
   */
  ajaxRequestType: HttpDataType;
  /**
   * If `true`, form data is collected automatically from form elements.
   * If `false`, you should bind values manually via `rv-value`.
   */
  autoSetFormData: boolean;
  stripHtml: boolean;
  scrollToInvalidElement: boolean;
  animateInvalidElement: boolean;
}

export class TwFormComponent extends Component {
  public static tagName = "tw-form";
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
      "scroll-to-invalid-element",
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
      onSubmit: this.onSubmit.bind(this),
      onReset: this.onReset.bind(this),

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
    this.init(TwFormComponent.observedAttributes);
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

  protected stripHtmlFromFields() {
    for (const key in this.scope.form.fields) {
      if (
        (this.scope.form.fields as any)[key] &&
        typeof (this.scope.form.fields as any)[key] === "string"
      ) {
        (this.scope.form.fields as any)[key] = stripHtml(
          (this.scope.form.fields as any)[key] as string,
        );
      }
    }
  }

  public onSubmit(event: Event, el: HTMLButtonElement) {
    if (!this.formEl) {
      console.warn("No form found");
      return false;
    }

    if (this.scope.autoSetFormData) {
      this.getFormValues();
    }

    if (this.scope.stripHtml) {
      this.stripHtmlFromFields();
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
      event.preventDefault();
      event.stopPropagation();
      this.ajaxSubmit(event, el);
    }
  }

  public onReset(event: Event) {
    if (!this.formEl) {
      console.warn("No form found");
      return;
    }
    this.formEl.reset();
    this.scope.form.valid = false;
    this.scope.form.error = undefined;
    this.scope.form.fields = {};

    // Remove validation styling
    this.formEl.classList.remove("tw-was-validated");

    this.dispatchEvent(new CustomEvent("form-reset"));
  }

  protected async ajaxSubmit(event?: Event, el?: HTMLButtonElement) {
    const submitSettings = this.getSubmitSettings(event);
    if (!submitSettings) {
      console.warn("Can't get submit settings");
      return;
    }

    if (this.scope.autoSetFormData) {
      this.getFormValues();
    }

    try {
      const res = await HttpService.fetch(
        submitSettings.action,
        submitSettings.method,
        this.scope.form.fields,
        submitSettings.type,
      );

      if (!res || !res.body) {
        return this.onErrorSubmit("500", "Error", "Empty body!");
      }

      const message = res.body && res.body.message ? res.body.message : "";
      if (Number(res.status) >= 400) {
        this.onErrorSubmit(res.status.toString(), message, res.body);
      }
      return this.onSuccessSubmit(res.status.toString(), message, res.body);
    } catch (err: any) {
      if (err.status && err.body) {
        this.onErrorSubmit(err.status, err.body.message, err.body);
      } else {
        throw err;
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
    let target = this.formEl.target;

    // Overwrite action by formaction attribute on the submitter button
    if ((event as SubmitEvent)?.submitter) {
      const submitter = (event as SubmitEvent).submitter as HTMLButtonElement;
      action = submitter.formAction || action;
      method = submitter.formMethod || method;
      target = submitter.formTarget || target;
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
        this.animateInvalidElement(invalidElement);
      }
    }

    this.dispatchEvent(
      new CustomEvent("invalid", {
        detail: { elements: invalidElements },
      }),
    );
  }

  protected scrollToElement(element: HTMLElement) {
    const vp = getViewportDimensions();
    const offset = vp.h / 2;
    scrollTo(element, offset, window);
  }

  protected animateInvalidElement(element: HTMLElement, endsOn = 3000) {
    element.classList.add("tw-invalid-flash");
    setTimeout(() => {
      element.classList.remove("tw-invalid-flash");
    }, endsOn);
  }

  protected onErrorSubmit(status: string, message: string, response: any) {
    this.dispatchEvent(
      new CustomEvent("submit-error", {
        detail: { status, message, response },
      }),
    );
  }

  protected onSuccessSubmit(status: string, message: string, response: any) {
    if (this.scope.disableSubmitUntilChange) {
      this.scope.submitDisabled = true;
    }

    this.dispatchEvent(
      new CustomEvent("submit-success", {
        detail: { status, message, response },
      }),
    );
  }

  protected validate(
    form: HTMLFormElement,
    validationScope: ValidationObject,
    errorEventName = "validation-error",
  ) {
    validationScope.valid = form.checkValidity();
    validationScope.error = form.validationMessage;
    if (!validationScope.valid) {
      this.dispatchEvent(new CustomEvent(errorEventName));
      form.classList.add("tw-was-validated");
    }
  }

  protected getFormValues() {
    if (!this.formEl) {
      console.warn("No form found");
      return null;
    }
    this.scope.form.fields = new FormData(this.formEl);
    return this.scope.form.fields;
  }

  protected initForm() {
    const formEl = this.querySelector("form");
    if (formEl) {
      this.formEl = formEl;
      this.formEl.setAttribute("novalidate", "");
    } else {
      console.warn("tw-form without a <form> child found");
    }
  }

  protected async template() {
    if (hasChildNodesTrim(this)) {
      this.initForm();
      return null;
    } else {
      const { default: tpl } = await import("./tw-form.component.html?raw");
      return tpl;
    }
  }
}
