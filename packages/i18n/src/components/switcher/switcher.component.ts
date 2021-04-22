import { TemplateFunction } from "@ribajs/core";
import { SwitcherComponent } from "../../types/switcher-component";
import { I18nService } from "../../services";
import { LocalesService } from "../../types";
import { Langcode } from "../../types";
export class I18nSwitcherComponent extends SwitcherComponent {
  public static tagName = "i18n-switcher";

  public _debug = false;

  static get observedAttributes(): string[] {
    return [];
  }

  protected localesService?: LocalesService;

  public scope = {
    langcodes: [] as Langcode[],
    switch: this.switch,
    toggle: this.toggle,
    ready: false,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(I18nSwitcherComponent.observedAttributes);
  }

  /**
   * Switch to language by langcode
   * @param langcode
   * @param event
   */
  public switch(langcode: Langcode, event?: Event) {
    this.debug("switch", langcode);
    return super.switch(langcode, event);
  }

  /**
   * Toggle language, makes only sense if you have only two languages
   * @param langcode
   * @param event
   */
  public toggle(event?: Event) {
    return super.toggle(event);
  }

  protected setLangcode(langcode: string) {
    return super.setLangcode(langcode);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.localesService = I18nService.options.localesService;
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
