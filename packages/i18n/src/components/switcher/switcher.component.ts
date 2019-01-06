import {
  RibaComponent,
  JQuery,
  Debug,
  Binder,
} from '@ribajs/core';
import { ILangcode } from '../../interfaces';
import { ALocalesService } from '../../services/locales-base.service';

export default (localesService: ALocalesService) => {

  return class I18nSwitcherComponent extends RibaComponent {

    public static tagName: string = 'rv-i18n-switcher';

    static get observedAttributes() {
      return [];
    }

    // protected $el: JQuery<HTMLElement>;

    protected localesService = localesService;

    protected debug = Debug('component:' + I18nSwitcherComponent.tagName);

    protected scope = {
      langcodes: <ILangcode[]> [],
      switch: this.switch,
      toggle: this.toggle,
      ready: <boolean> false,
    };

    constructor(element?: HTMLElement) {
      super(element);
      // this.$el = JQuery(this.el);
      this.debug('constructor', this);

      if (this.localesService.ready) {
        const langcode = this.localesService.getLangcode();
        if (langcode) {
          this.initOnReady(langcode);
        }
      } else {
        this.localesService.event.on('ready', (langcode: string, translationNeeded: boolean) => {
          this.initOnReady(langcode);
        });
      }
    }

    public async initOnReady(langcode: string) {
      // set avaible langcodes
      return this.localesService.getAvailableLangcodes()
      .then((langcodes) => {
        this.scope.langcodes = langcodes;
        // set active langcodes
        this.scope.langcodes.forEach((langCode) => {
          langCode.active = (langCode.code === langcode);
        });
        try {
          this.init(I18nSwitcherComponent.observedAttributes);
        } catch (error) {
          console.error(error);
        }
      })
      .then(() => {
        this.localesService.event.on('changed', (changedLangcode: string, initial: boolean) => {
          // Activate localcode and disable the other
          this.scope.langcodes.forEach((langCode) => {
            langCode.active = (langCode.code === changedLangcode);
          });
          this.debug('changed', this.scope.langcodes, changedLangcode);
        });
      })
      .then(() => {
        this.scope.ready = true;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
    }

    /**
     * Switch to language by langcode
     * @param langcode
     * @param event
     */
    public switch(langcode: ILangcode, context: Binder<any>, event: Event) {
      event.preventDefault();
      event.stopPropagation();
      this.debug('switch', langcode);
      if (!langcode.active) {
        this.setLangcode(langcode.code);
      }
    }

    /**
     * Toggle language, makes only sense if you have only two languages
     * @param langcode
     * @param event
     */
    public toggle(context: Binder<any>, event: Event) {
      event.preventDefault();
      event.stopPropagation();
      this.debug('toggle');
      for (const i in this.scope.langcodes) {
        if (this.scope.langcodes.hasOwnProperty(i)) {
          if (this.scope.langcodes[i].active !== true) {
            this.debug('toggle active', this.scope.langcodes[i].active, this.scope.langcodes[i].code);
            this.setLangcode(this.scope.langcodes[i].code);
            return;
          }
        }
      }
    }

    protected setLangcode(langcode: string) {
      this.debug('setLangcode', langcode);
      this.localesService.setLangcode(langcode);
    }

    protected async beforeBind() {
      this.debug('beforeBind', this.scope);
    }

    protected async afterBind() {
      this.debug('afterBind', this.scope);
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
