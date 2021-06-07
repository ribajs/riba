import { Binder } from '@ribajs/core';
import { extend } from '@ribajs/utils/src/type';
import { I18nService } from '../../services/i18n.service';
import { LocalesService } from '../../types';

// see star.binder.ts
export interface BinderAttributeChangedEvent {
  detail: {
    name: string;
    oldValue: string;
    newValue: string;
    namespace: null;
  };
}

/**
 *
 */
export const i18nStarBinder: Binder<string> = {
  name: 'i18n-*',
  block: false,
  priority: 0,
  bind(el: HTMLUnknownElement) {
    const options = I18nService.options;
    const getElementData = () => {
      const customData: any = {};
      customData.type = (el as HTMLInputElement).type;
      customData.tagName = el.tagName;
      customData.contenteditable = el.getAttribute('contenteditable')
        ? true
        : false;
      customData.isRadio =
        customData.tagName === 'INPUT' && customData.type === 'radio';
      return customData;
    };
    this.customData = getElementData();
    this.customData.i18n = options.localesService;
    this.customData.vars = {};
    this.customData.translateMePathString = null;
    this.customData.properties = [];
    this.customData.attributeName = this.args[0].toString();

    this.customData.applyTranslation = (locale: string) => {
      if (!locale) {
        if ((this.customData.i18n as LocalesService).showMissingTranslation) {
          locale = `translation missing: "${this.customData.properties.join(
            '.',
          )}"`;
        } else {
          return;
        }
      }
      if (this.customData.attributeName === 'html') {
        el.innerHTML = locale;
      } else if (this.customData.attributeName === 'text') {
        el.innerText = locale;
      } else if (this.customData.attributeName === 'value') {
        // TODO support also: https://github.com/JumpLinkNetwork/tinybind/blob/master/src/binders/basic/value.binder.ts#L51
        if (this.customData.contenteditable) {
          el.innerHTML = locale;
        } else {
          (el as HTMLInputElement).value = locale;
        }
      } else {
        el.setAttribute(this.customData.attributeName, locale);
      }
    };

    this.customData.parseVars = (_el: HTMLElement) => {
      // parse templates to vars
      const newVars = (
        this.customData.i18n as LocalesService
      ).parseTemplateVars(_el);
      this.customData.vars = extend(
        { deep: true },
        this.customData.vars,
        newVars,
      );

      // parse data attributes to vars
      this.customData.vars = extend(
        { deep: false },
        this.customData.vars,
        _el.dataset,
      );
      console.debug('this.customData.vars', this.customData.vars, _el.dataset);
      // Parse templates which have his own translations
      this.customData.langVars = (
        this.customData.i18n as LocalesService
      ).parseLocalVars(_el);
    };

    this.customData.translate = (langcode?: string) => {
      // If language service is not ready do nothing
      if (!(this.customData.i18n as LocalesService).ready) {
        return;
      }
      if (!langcode) {
        langcode = (this.customData.i18n as LocalesService).getLangcode();
        if (!langcode) {
          console.error('Langcode is required', langcode);
          return;
        }
      }

      // translate by using the already translated language variable
      if (this.customData.langVars && this.customData.langVars[langcode]) {
        return this.customData.applyTranslation(
          this.customData.langVars[langcode],
        );
      }

      if (
        !this.customData.properties ||
        this.customData.properties.length === 0
      ) {
        // get the default translation if available
        if (this.customData.langVars && this.customData.langVars.default) {
          // console.warn('Translate by default', this.customData.langVars.default);
          return this.customData.applyTranslation(
            this.customData.langVars.default,
          );
        }
      }

      // translate by properties, e.g. de.cart.add
      return (this.customData.i18n as LocalesService)
        .get([langcode, ...this.customData.properties], this.customData.vars)
        .then((local: string) => {
          if (local && typeof local === 'string') {
            // console.warn('Translate by properties', [langcode, ...this.customData.properties], local);
            return this.customData.applyTranslation(local);
          }
          // get the default translation if available
          if (this.customData.langVars && this.customData.langVars.default) {
            // console.warn('Translate by default as fallback', this.customData.langVars.default);
            return this.customData.applyTranslation(
              this.customData.langVars.default,
            );
          }

          return this.customData.applyTranslation(null);
        })
        .catch((error: Error) => {
          console.error(error);
        });
    };

    this.customData.onAttributeChanged = (
      data: BinderAttributeChangedEvent,
    ) => {
      if (data.detail.name.startsWith('data-')) {
        const varName = data.detail.name.slice(5);
        const newVar: any = {};
        newVar[varName] = data.detail.newValue;
        this.customData.vars = extend(
          { deep: true },
          this.customData.vars,
          newVar,
        );
        this.customData.translate();
      }
    };

    this.customData.onLanguageChanged = (
      langcode: string,
      initial: boolean,
    ) => {
      // Do not translate on initial language change, we use the ready event for this
      if (!initial) {
        this.customData.translate(langcode);
      }
    };

    /**
     * Initial stuff wee need to do after the language service is ready
     */
    this.customData.initOnReady = (
      langcode: string,
      translationNeeded: boolean,
    ) => {
      // Translate on translation service ready if needed
      if (translationNeeded) {
        this.customData.translate(langcode);
      }

      // Translate if language changes
      (this.customData.i18n as LocalesService).event.on(
        'changed',
        this.customData.onLanguageChanged,
      );

      // Translate if binder attribute event is changed
      el.addEventListener('binder-changed', this.customData.onAttributeChanged);
    };
  },

  routine(el: HTMLElement, translateMePathString?: string) {
    const options = I18nService.options;
    if (this.customData.translateMePathString === null) {
      // if this is the first call of this function
      this.customData.translateMePathString = translateMePathString;
      if (translateMePathString) {
        this.customData.properties =
          this.customData.translateMePathString.split('.');
      }

      this.customData.parseVars(el);

      // Translate if language is ready
      if ((this.customData.i18n as LocalesService).ready) {
        const currentLangcode = (
          this.customData.i18n as LocalesService
        ).getLangcode();
        const initialLangcode = (
          this.customData.i18n as LocalesService
        ).getInitialLangcode();
        this.customData.initOnReady(
          currentLangcode,
          currentLangcode !== initialLangcode ||
            !options.localesService.doNotTranslateDefaultLanguage,
        );
      } else {
        (this.customData.i18n as LocalesService).event.on(
          'ready',
          this.customData.initOnReady,
        );
      }
    } else if (
      this.customData.translateMePathString !== translateMePathString
    ) {
      // If translate string was changed
      this.customData.translateMePathString = translateMePathString;
      this.customData.properties =
        this.customData.translateMePathString.split('.');
      this.customData.parseVars(el);
      this.customData.translate();
    }
  },

  unbind() {
    this.el.removeEventListener(
      'binder-changed',
      this.customData.onAttributeChanged,
    );
    (this.customData.i18n as LocalesService).event.off(
      'changed',
      this.customData.onLanguageChanged,
    );
  },
} as Binder<string>;
