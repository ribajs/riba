import { TemplateFunction, Component, ScopeBase } from "@ribajs/core";
import { I18nService } from "../../services/index.js";
import { LocalesService , Langcode } from "../../types/index.js";

export interface Scope extends ScopeBase {
  langcodes: Langcode[];
  switch: I18nSwitcherComponent["switch"];
  toggle: I18nSwitcherComponent["toggle"];
  ready: boolean;
}

export class I18nSwitcherComponent extends Component {
  public static tagName = "i18n-switcher";

  public _debug = true;

  static get observedAttributes(): string[] {
    return [];
  }

  protected localesService?: LocalesService;

  public scope: Scope = {
    langcodes: [],
    switch: this.switch,
    toggle: this.toggle,
    ready: false
  };

  protected connectedCallback() {
    super.connectedCallback();
    this.init(I18nSwitcherComponent.observedAttributes);
  }

  protected setLangcode(langcode: string) {
    this.localesService?.setLangcode(langcode);
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

    if (!this.localesService) {
      throw new Error("LocalesService not defined!");
    }

    if (this.localesService.ready) {
      const langcode = this.localesService.getLangcode();
      if (langcode) {
        return await this.initLocales(langcode);
      }
    } else {
      this.localesService?.event.on(
        "ready",
        async (langcode: string /*, translationNeeded: boolean*/) => {
          await this.initLocales(langcode);
        }
      );
    }
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
    for (const i in this.scope.langcodes) {
      if (Object.prototype.hasOwnProperty.call(this.scope.langcodes, i)) {
        if (this.scope.langcodes[i].active !== true) {
          this.setLangcode(this.scope.langcodes[i].code);
          return;
        }
      }
    }
  }

  protected async initLocales(langcode: string) {
    // set available langcodes
    const langcodes = await this.localesService?.getAvailableLangcodes();

    if (!langcodes) {
      throw new Error("No lancodes found!");
    }

    this.scope.langcodes = langcodes;
    // set active langcodes
    this.scope.langcodes.forEach((langCode) => {
      langCode.active = langCode.code === langcode;
    });

    this.localesService?.event.on(
      "changed",
      (changedLangcode: string /*, initial: boolean*/) => {
        // Activate localcode and disable the other
        this.scope.langcodes.forEach((langCode) => {
          langCode.active = langCode.code === changedLangcode;
        });
      }
    );

    this.scope.ready = true;
    return this.scope.langcodes;
  }
}
