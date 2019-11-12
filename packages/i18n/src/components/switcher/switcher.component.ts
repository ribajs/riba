import { Binder, Type } from '@ribajs/core';
import { AI18nSwitcherComponent } from '../abstract-switcher/switcher.abstract.component';
import { Langcode } from '../../interfaces';
import { ALocalesService } from '../../services/locales-base.service';

export const i18nSwitcherComponentWrapper = (localesService: ALocalesService): Type<AI18nSwitcherComponent> => {

  return class I18nSwitcherComponent extends AI18nSwitcherComponent {

    public static tagName: string = 'i18n-switcher';

    static get observedAttributes() {
      return [];
    }

    protected localesService = localesService;

    protected scope = {
      langcodes: <Langcode[]> [],
      switch: this.switch,
      toggle: this.toggle,
      ready: <boolean> false,
    };

    constructor(element?: HTMLElement) {
      super(element);
      this.init(I18nSwitcherComponent.observedAttributes);
    }

    /**
     * Switch to language by langcode
     * @param langcode
     * @param event
     */
    public switch(langcode: Langcode, context?: Binder<any>, event?: Event) {
      return super.switch(langcode, context, event);
    }

    /**
     * Toggle language, makes only sense if you have only two languages
     * @param langcode
     * @param event
     */
    public toggle(context?: Binder<any>, event?: Event) {
      return super.toggle(context, event);
    }

    protected setLangcode(langcode: string) {
      return super.setLangcode(langcode);
    }

    protected requiredAttributes() {
      return [];
    }

    protected disconnectedCallback() {
      super.disconnectedCallback();
    }

    protected template() {
      return null;
    }
  };
};
