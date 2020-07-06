import {
  OcFormComponent,
  Scope as OcFormScope,
} from "@ribajs/octobercms/src/components/oc-form/oc-form.component";
import { loadScript, getUID } from "@ribajs/utils/src/dom";

export interface Scope extends OcFormScope {
  hcaptchaSrc: string;
  hcaptchaHl: string;
  hcaptchaRender: "explicit" | "onload";
  /** normally this is not needed because we have our own callback which is triggered when the script is loaded */
  hcaptchaOnload?: string;
  hcaptchaSitekey: string;
  hcaptchaSize: "invisible" | "normal" | "compact";
  hcaptchaCallback: string;
  hcaptchaTheme: "light" | "dark";
  hcaptchaTabindex: number;
  hcaptchaExpiredCallback?: string;
  hcaptchaErrorCallback?: string;
  hcaptchaContainerSelector: string;
}

export class HCaptchaFormComponent extends OcFormComponent {
  public static tagName = "hcaptcha-oc-form";

  public _debug = true;
  protected autobind = true;

  protected widgetID?: string;

  static get observedAttributes() {
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
      hcaptchaCallback: "onHCaptchaSubmit",
      // hcaptchaExpiredCallback: "onHCaptchaExpired",
      hcaptchaErrorCallback: "onHCaptchaError",
      hcaptchaContainerSelector: ".h-captcha-container",
    };

    scope.hcaptchaCallback = getUID(scope.hcaptchaCallback);

    return scope;
  }

  protected scope: Scope = this.getDefaultScope();

  constructor(element?: HTMLElement) {
    super(element);
    this.init(HCaptchaFormComponent.observedAttributes);
  }

  public onSubmit(event: Event) {
    this.debug("onSubmit", this.scope);
    return super.onSubmit(event);
  }

  protected ajaxSubmit() {
    this.debug(
      "ajaxSubmit",
      "octoberHandler",
      this.scope.octoberHandler,
      "widgetID",
      this.widgetID
    );

    if (this.scope.hcaptchaSize === "invisible") {
      this.scope.submitDisabled = true;
      (window as any).hcaptcha.execute(this.widgetID);
    } else {
      return super.ajaxSubmit();
    }
  }

  protected onHCaptchaLoaded() {
    this.debug("onHCaptchaLoaded", window.hcaptcha);
    const params = this.getHCaptchaParams();
    const container = this.el.querySelector(
      this.scope.hcaptchaContainerSelector
    );
    if (!container) {
      console.warn(
        `HCaptcha container element with selector "${this.scope.hcaptchaContainerSelector}" not found!`
      );
      return;
    }
    this.widgetID = (window as any).hcaptcha.render(container, params);
    this.debug("widgetID", this.widgetID);
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

  protected initHCaptcha() {
    // Set this to the global window object to make it callable by hCaptcha

    (window as any)[this.scope.hcaptchaCallback] = (token: string) => {
      if (this.scope.hcaptchaSize === "invisible") {
        this.debug(`[${this.scope.hcaptchaCallback}]`, token, this);
        // Trigger the default ajaxSubmit of Bs4FormComponent
        return super.ajaxSubmit();
      }
    };

    // Set this to the global window object to make it callable by hCaptcha
    (window as any).onHCaptchaExpired = (token: string) => {
      this.debug("[onHCaptchaExpired]", token, this);
    };

    // Set this to the global window object to make it callable by hCaptcha
    (window as any).onHCaptchaError = (error: Error) => {
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

  // protected template() {
  //   return null;
  // }
}
