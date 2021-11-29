import { Bs4FormComponent } from "@ribajs/bs4";
import { OcFormComponentScope as Scope } from "../../types";

export class OcFormComponent extends Bs4FormComponent {
  public static tagName = "oc-form";

  public _debug = false;

  static get observedAttributes(): string[] {
    return [...Bs4FormComponent.observedAttributes, "october-handler"];
  }

  protected requiredAttributes(): string[] {
    const requiredAttributes = super.requiredAttributes();
    // requiredAttributes.push("octoberHandler");
    return requiredAttributes;
  }

  protected getDefaultScope(): Scope {
    const scope = super.getDefaultScope() as Partial<Scope>;
    scope.octoberHandler = "";
    return scope as Scope;
  }

  public scope: Scope = this.getDefaultScope();

  protected connectedCallback() {
    this.debug("connectedCallback");
    this.init(OcFormComponent.observedAttributes);
    this.addEventListeners();
  }

  protected async ajaxSubmit(event?: Event, el?: HTMLButtonElement) {
    if (!this.scope.octoberHandler) {
      return await super.ajaxSubmit(event, el);
    }

    this.debug("ajaxSubmit", this.scope.octoberHandler);
    const submitSettings = this.getSubmitSettings(event);
    if (!submitSettings) {
      console.warn("Can't get submit settings");
      return;
    }

    if (!this.formEl) {
      console.warn("No form found");
      return;
    }

    // See October CMS JavaScript API: https://octobercms.com/docs/ajax/javascript-api
    const $form = window.jQuery(this.formEl);
    ($form as any).request(this.scope.octoberHandler, {
      url: submitSettings.action,
      error: (jqXHR: any, statusText: string, error: any) => {
        console.error(jqXHR, statusText, error);
        if (jqXHR.responseJSON?.error) {
          this.onErrorSubmit(
            jqXHR.responseJSON.error,
            jqXHR.responseJSON.error,
            jqXHR
          );
        } else {
          this.onErrorSubmit(statusText, statusText, jqXHR);
        }
      },
    });

    // See October CMS JavaScript API AJAX handlers: https://octobercms.com/docs/ajax/handlers
    $form.one(
      "ajaxSuccess",
      (
        event: JQuery.Event,
        context: any,
        body: any,
        statusText: string,
        jqXHR: any
      ) => {
        this.onSuccessSubmit(statusText, body.result, jqXHR);
      }
    );
    $form.one(
      "ajaxError",
      (
        event: JQuery.Event,
        context: any,
        message: string,
        statusText: string,
        jqXHR: any
      ) => {
        this.onErrorSubmit(statusText, message, jqXHR);
      }
    );
  }
}
