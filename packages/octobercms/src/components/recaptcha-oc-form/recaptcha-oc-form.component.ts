import { OcFormComponent } from "../oc-form/oc-form.component.js";
import { ReCaptchaFormComponentScope as Scope } from "../../types/index.js";
import { loadScript, waitForProp, getUID } from "@ribajs/utils/src/index.js";

export class ReCaptchaFormComponent extends OcFormComponent {
  public static tagName = "recaptcha-oc-form";

  public _debug = false;
  protected autobind = true;

  protected widgetID?: string;

  static get observedAttributes(): string[] {
    return [
      ...OcFormComponent.observedAttributes,
      "recaptcha-src",
      "recaptcha-hl",
      "recaptcha-onload",
      "recaptcha-render",
      "recaptcha-sitekey",
      "recaptcha-size",
      "recaptcha-callback",
      "recaptcha-theme",
      "recaptcha-tabindex",
      "recaptcha-expired-callback",
      "recaptcha-error-callback",
      "recaptcha-container-selector"
    ];
  }

  protected getDefaultScope(): Scope {
    const scope: Scope = {
      ...super.getDefaultScope(),
      recaptchaSrc: "https://www.google.com/recaptcha/api.js",
      recaptchaHl: "en",
      recaptchaOnload: undefined,
      recaptchaRender: "explicit",
      recaptchaSitekey: "",
      recaptchaSize: "invisible",
      recaptchaTheme: "light",
      recaptchaTabindex: 0,
      recaptchaCallback: getUID("onReCaptchaSubmit"),
      // recaptchaExpiredCallback: "onReCaptchaExpired",
      recaptchaErrorCallback: "onReCaptchaError",
      recaptchaContainerSelector:
        ".h-captcha-container, .re-captcha-container, .hcaptcha-container, .recaptcha-container",

      // Methods
      onSubmit: this.onSubmit
    };

    return scope;
  }

  public scope: Scope = this.getDefaultScope();

  constructor() {
    super();
  }

  public onSubmit(event: Event, el: HTMLButtonElement) {
    this.debug("onSubmit", this.scope, event, el);
    return super.onSubmit(event, el);
  }

  protected async ajaxSubmit(event?: Event, el?: HTMLButtonElement) {
    this.debug(
      "ajaxSubmit",
      "octoberHandler",
      this.scope.octoberHandler,
      "widgetID",
      this.widgetID,
      event,
      this.scope.recaptchaCallback,
      el
    );

    if (this.scope.recaptchaSize === "invisible") {
      this.scope.submitDisabled = true;
      window.recaptcha.execute(this.widgetID);
    } else {
      return super.ajaxSubmit();
    }
  }

  protected onReCaptchaLoaded() {
    this.debug("onReCaptchaLoaded", window.grecaptcha);
    const params = this.getReCaptchaParams();
    const container = this.querySelector(this.scope.recaptchaContainerSelector);
    if (!container) {
      console.warn(
        `ReCaptcha container element with selector "${this.scope.recaptchaContainerSelector}" not found!`
      );
      return;
    }
    this.widgetID = window.grecaptcha.render(container, params);
    this.debug("widgetID", this.widgetID, this.getReCaptchaParams);
  }

  protected getReCaptchaSrc() {
    const searchQuery: any = {};
    if (this.scope.recaptchaHl) {
      searchQuery.hl = this.scope.recaptchaHl;
    }
    if (this.scope.recaptchaRender) {
      searchQuery.render = this.scope.recaptchaRender;
    }
    if (this.scope.recaptchaOnload) {
      searchQuery.onload = this.scope.recaptchaOnload;
    }

    const recaptchaSrc =
      this.scope.recaptchaSrc + "?" + new URLSearchParams(searchQuery);

    return recaptchaSrc;
  }

  protected getReCaptchaParams() {
    return {
      sitekey: this.scope.recaptchaSitekey,
      size: this.scope.recaptchaSize,
      callback: this.scope.recaptchaCallback,
      theme: this.scope.recaptchaTheme,
      tabindex: this.scope.recaptchaTabindex,
      foobar: this.scope.recaptchaExpiredCallback,
      "expired-callback": this.scope.recaptchaErrorCallback,
      "error-callback": this.scope.recaptchaErrorCallback
    };
  }

  protected recaptchaComplete(): boolean {
    return true;
  }

  protected async initReCaptcha() {
    // Set this to the global window object to make it callable by hCaptcha

    window[this.scope.recaptchaCallback] = (token: string) => {
      if (this.scope.recaptchaSize === "invisible") {
        this.debug(`[${this.scope.recaptchaCallback}]`, token, this);
        // Trigger the default ajaxSubmit of Bs4FormComponent
        if (this.recaptchaComplete()) {
          return super.ajaxSubmit();
        }
      }
    };

    // Set this to the global window object to make it callable by hCaptcha
    window.onReCaptchaExpired = (token: string) => {
      this.debug("[onReCaptchaExpired]", token, this);
    };

    // Set this to the global window object to make it callable by hCaptcha
    window.onReCaptchaError = (error: Error) => {
      this.debug("[onReCaptchaError]", error, this);
    };

    const recaptchaSrc = this.getReCaptchaSrc();

    this.debug("recaptchaSrc", recaptchaSrc);

    if (window.grecaptcha) {
      this.onReCaptchaLoaded();
    } else {
      try {
        await loadScript(recaptchaSrc, "recaptcha-src", true, true);
        await waitForProp("grecaptcha", window);
        await waitForProp("render", window.grecaptcha);
        this.onReCaptchaLoaded();
      } catch (error) {
        console.error(`Error on load ReCaptcha from "${recaptchaSrc}"`, error);
      }
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.debug("connectedCallback");
    this.init(ReCaptchaFormComponent.observedAttributes);
    this.initReCaptcha();
    this.addEventListeners();
  }

  protected requiredAttributes(): string[] {
    return [
      ...super.requiredAttributes(),
      "recaptchaSrc",
      "recaptchaHl",
      "recaptchaRender",
      "recaptchaSitekey",
      "recaptchaSize",
      "recaptchaCallback"
    ];
  }

  // protected template(): ReturnType<TemplateFunction> {
  //   return null;
  // }
}
