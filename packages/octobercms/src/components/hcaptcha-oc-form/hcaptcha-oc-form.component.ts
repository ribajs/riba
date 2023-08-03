import { OcFormComponent } from "../oc-form/oc-form.component.js";
import { HCaptchaFormComponentScope as Scope } from "../../types/index.js";
import { loadScript, getUID } from "@ribajs/utils/src/dom.js";

export class HCaptchaFormComponent extends OcFormComponent {
  public static tagName = "hcaptcha-oc-form";

  public _debug = false;
  protected autobind = true;

  protected widgetID?: string;

  static get observedAttributes(): string[] {
    return [
      ...OcFormComponent.observedAttributes,
      "hcaptcha-src",
      "hcaptcha-hl",
      "hcaptcha-onload",
      "hcaptcha-render",
      "hcaptcha-sitekey",
      "hcaptcha-size",
      "hcaptcha-callback",
      "hcaptcha-theme",
      "hcaptcha-tabindex",
      "hcaptcha-expired-callback",
      "hcaptcha-error-callback",
      "hcaptcha-container-selector",
    ];
  }

  protected getDefaultScope(): Scope {
    const scope: Scope = {
      ...super.getDefaultScope(),
      hcaptchaSrc: "https://hcaptcha.com/1/api.js",
      hcaptchaHl: "en",
      hcaptchaOnload: undefined,
      hcaptchaRender: "explicit",
      hcaptchaSitekey: "",
      hcaptchaSize: "invisible",
      hcaptchaTheme: "light",
      hcaptchaTabindex: 0,
      hcaptchaCallback: getUID("onHCaptchaSubmit"),
      // hcaptchaExpiredCallback: "onHCaptchaExpired",
      hcaptchaErrorCallback: "onHCaptchaError",
      hcaptchaContainerSelector:
        ".h-captcha-container, .re-captcha-container, .hcaptcha-container, .recaptcha-container",

      // Methods
      onSubmit: this.onSubmit,
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
      this.scope.hcaptchaCallback,
      el,
    );

    if (this.scope.hcaptchaSize === "invisible") {
      this.scope.submitDisabled = true;
      window.hcaptcha.execute(this.widgetID);
    } else {
      return super.ajaxSubmit();
    }
  }

  protected onHCaptchaLoaded() {
    this.debug("onHCaptchaLoaded", window.hcaptcha);
    const params = this.getHCaptchaParams();
    const container = this.querySelector(this.scope.hcaptchaContainerSelector);
    if (!container) {
      console.warn(
        `HCaptcha container element with selector "${this.scope.hcaptchaContainerSelector}" not found!`,
      );
      return;
    }
    this.widgetID = window.hcaptcha.render(container, params);
    this.debug("widgetID", this.widgetID, this.getHCaptchaParams);
  }

  protected getHCaptchaSrc() {
    const searchQuery: any = {};
    if (this.scope.hcaptchaHl) {
      searchQuery.hl = this.scope.hcaptchaHl;
    }
    if (this.scope.hcaptchaRender) {
      searchQuery.render = this.scope.hcaptchaRender;
    }
    if (this.scope.hcaptchaOnload) {
      searchQuery.onload = this.scope.hcaptchaOnload;
    }

    const hcaptchaSrc =
      this.scope.hcaptchaSrc + "?" + new URLSearchParams(searchQuery);

    return hcaptchaSrc;
  }

  protected getHCaptchaParams() {
    return {
      sitekey: this.scope.hcaptchaSitekey,
      size: this.scope.hcaptchaSize,
      callback: this.scope.hcaptchaCallback,
      theme: this.scope.hcaptchaTheme,
      tabindex: this.scope.hcaptchaTabindex,
      foobar: this.scope.hcaptchaExpiredCallback,
      "expired-callback": this.scope.hcaptchaErrorCallback,
      "error-callback": this.scope.hcaptchaErrorCallback,
    };
  }

  protected hcaptchaComplete(): boolean {
    return true;
  }

  protected initHCaptcha() {
    // Set this to the global window object to make it callable by hCaptcha

    window[this.scope.hcaptchaCallback] = (token: string) => {
      if (this.scope.hcaptchaSize === "invisible") {
        this.debug(`[${this.scope.hcaptchaCallback}]`, token, this);
        // Trigger the default ajaxSubmit of Bs4FormComponent
        if (this.hcaptchaComplete()) {
          return super.ajaxSubmit();
        }
      }
    };

    // Set this to the global window object to make it callable by hCaptcha
    window.onHCaptchaExpired = (token: string) => {
      this.debug("[onHCaptchaExpired]", token, this);
    };

    // Set this to the global window object to make it callable by hCaptcha
    window.onHCaptchaError = (error: Error) => {
      this.debug("[onHCaptchaError]", error, this);
    };

    const hcaptchaSrc = this.getHCaptchaSrc();

    this.debug("hcaptchaSrc", hcaptchaSrc);

    if (window.hcaptcha) {
      this.onHCaptchaLoaded();
    } else {
      loadScript(hcaptchaSrc, "hcaptcha-src", true, true)
        .then(this.onHCaptchaLoaded.bind(this))
        .catch((err: Error) => {
          if (window.hcaptcha) {
            return window.hcaptcha;
          }
          console.error(`Error on load HCaptcha from "${hcaptchaSrc}"`, err);
        });
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.debug("connectedCallback");
    this.init(HCaptchaFormComponent.observedAttributes);
    this.initHCaptcha();
    this.addEventListeners();
  }

  protected requiredAttributes(): string[] {
    return [
      ...super.requiredAttributes(),
      "hcaptchaSrc",
      "hcaptchaHl",
      "hcaptchaRender",
      "hcaptchaSitekey",
      "hcaptchaSize",
      "hcaptchaCallback",
    ];
  }

  // protected template(): ReturnType<TemplateFunction> {
  //   return null;
  // }
}
