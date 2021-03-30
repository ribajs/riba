import { TypeOfComponent, TemplateFunction } from "@ribajs/core";
import { AI18nSwitcherComponent } from "../abstract-switcher/switcher.abstract.component";
import { Langcode } from "../../interfaces";
import { ALocalesService } from "../../services/locales-base.service";

export const i18nSwitcherComponentWrapper = (
  localesService: ALocalesService
): TypeOfComponent<AI18nSwitcherComponent> => {
  return class I18nSwitcherComponent extends AI18nSwitcherComponent {
    public static tagName = "i18n-switcher";

    public _debug = false;

    static get observedAttributes(): string[] {
      return [];
    }

    protected localesService = localesService;

    protected scope = {
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

    protected template(): ReturnType<TemplateFunction> {
      return null;
    }
  };
};
