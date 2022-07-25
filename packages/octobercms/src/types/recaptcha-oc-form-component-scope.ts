import type { OcFormComponentScope } from "./oc-form-component-scope.js";

export interface ReCaptchaFormComponentScope extends OcFormComponentScope {
  recaptchaSrc: string;
  recaptchaHl: string;
  recaptchaRender: "explicit" | "onload";
  /** normally this is not needed because we have our own callback which is triggered when the script is loaded */
  recaptchaOnload?: string;
  recaptchaSitekey: string;
  recaptchaSize: "invisible" | "normal" | "compact";
  recaptchaCallback: string;
  recaptchaTheme: "light" | "dark";
  recaptchaTabindex: number;
  recaptchaExpiredCallback?: string;
  recaptchaErrorCallback?: string;
  recaptchaContainerSelector: string;
}
