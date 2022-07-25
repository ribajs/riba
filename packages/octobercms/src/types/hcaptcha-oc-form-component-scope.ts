import type { OcFormComponentScope } from "./oc-form-component-scope.js";

export interface HCaptchaFormComponentScope extends OcFormComponentScope {
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
