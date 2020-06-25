import { Bs4FormComponent, Scope as Bs4FormScope } from "@ribajs/bs4/src/components/bs4-form/bs4-form.component";

export interface Scope extends Bs4FormScope {
  octoberHandler: string;
}

export class OcFormComponent extends Bs4FormComponent {
  public static tagName = "oc-form";

  public _debug = true;

  static get observedAttributes() {
    return [...Bs4FormComponent.observedAttributes, "october-handler"];
  }

  protected requiredAttributes(): string[] {
    const requiredAttributes = super.requiredAttributes();
    requiredAttributes.push("octoberHandler");
    return requiredAttributes;
  }

  protected scope: Scope = {
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

    octoberHandler: "",
  };
  
  // constructor(element?: HTMLElement) {
  //   super(element);
  // }

  protected connectedCallback() {
    this.debug("connectedCallback");
    super.connectedCallback();
    this.init(OcFormComponent.observedAttributes);

    if (this.scope.disableSubmitUntilChange) {
      this.el.addEventListener("input", () => {
        this.scope.submitDisabled = false;
      });
    }
  }


  // public onSubmit(event: Event) {
  //   this.debug("onSubmit", this.scope);
  //   return super.onSubmit(event);
  // }

  protected ajaxSubmit() {
    const submitSettings = this.getSubmitSettings();
    if (!submitSettings) {
      console.warn("Can't get submit settings");
      return;
    }

    if (!this.formEl) {
      console.warn("No form found");
      return false;
    }

    (window.jQuery(this.formEl) as any).request(this.scope.octoberHandler, {
      success: (data: any) => {
        this.debug("ajaxSubmit success", data);
        this.onSuccessSubmit(data);
      },
      error: (err: Error) => {
        console.error(err);
        this.onErrorSubmit(err);
      }
    });
  }

}