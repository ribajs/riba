import { TemplateFunction, Component, ScopeBase } from "@ribajs/core";
import { I18nService } from "../../services/i18n.service.js";
import type { LocalesService } from "../../services/locales.service.js";
import type { Langcode } from "../../types/index.js";

export interface Scope extends ScopeBase {
  langcodes: Langcode[];
  switch: I18nSwitcherComponent["switch"];
  toggle: I18nSwitcherComponent["toggle"];
  ready: boolean;
}

export class I18nSwitcherComponent extends Component {
  public static tagName = "i18n-switcher";

  public _debug = false;

  static get observedAttributes(): string[] {
    return [];
  }

  protected localesService?: LocalesService;
  protected unsubscribes: Array<() => void> = [];

  public scope: Scope = {
    langcodes: [],
    switch: this.switch,
    toggle: this.toggle,
    ready: false,
  };

  protected connectedCallback() {
    super.connectedCallback();
    this.init(I18nSwitcherComponent.observedAttributes);
  }

  protected setLangcode(langcode: string) {
    this.localesService?.setLangcode(langcode).catch((error: unknown) => {
      console.error(error);
    });
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected disconnectedCallback() {
    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
    this.unsubscribes = [];
    super.disconnectedCallback();
  }

  protected async beforeBind() {
    await super.beforeBind();

    this.localesService = I18nService.getLocalesService();
    this.unsubscribes.push(
      this.localesService.on("ready", this.refresh),
      this.localesService.on("changed", this.refresh),
    );
    this.refresh();
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }

  /**
   * Switch to language by langcode
   * @param langcode
   * @param event
   */
  public switch(langcode: Langcode, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!langcode.active) {
      this.setLangcode(langcode.code);
    }
  }

  /**
   * Toggle language, makes only sense if you have only two languages
   * @param langcode
   * @param event
   */
  public toggle(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const next = this.scope.langcodes.find((langcode) => !langcode.active);
    if (next) {
      this.setLangcode(next.code);
    }
  }

  /** The languages are configured on the service, only the active one changes */
  protected refresh = () => {
    if (!this.localesService) {
      return;
    }
    this.scope.langcodes = this.localesService.getAvailableLangcodes();
    this.scope.ready = this.localesService.ready;
  };
}
