import { Binder, BinderAttributeChangedEvent } from "@ribajs/core";
import { extend } from "@ribajs/utils/src/type";
import { I18nService } from "../services/i18n.service";
import { LocalesService, LocalVar, LocalPluralization } from "../types";

/**
 *
 */
export class I18nStarBinder extends Binder<string, HTMLInputElement> {
  static key = "i18n-*";
  priority = 0;

  private contenteditable = false;

  private vars: LocalVar = {};
  private langVars: LocalVar = {};
  private properties: string[] = [];
  private attributeName = "";
  private translateMePathString?: string | null = null;

  private i18n?: LocalesService;

  private applyTranslation(locale: string | LocalPluralization | null) {
    if (!locale) {
      if ((this.i18n as LocalesService).showMissingTranslation) {
        locale = `translation missing: "${this.properties.join(".")}"`;
      } else {
        return;
      }
    }
    if (typeof locale !== "string") {
      console.warn("TODO", locale);
      return;
    }
    if (this.attributeName === "html") {
      this.el.innerHTML = locale;
    } else if (this.attributeName === "text") {
      this.el.innerText = locale;
    } else if (this.attributeName === "value") {
      // TODO support also: https://github.com/JumpLinkNetwork/tinybind/blob/master/src/binders/basic/value.binder.ts#L51
      if (this.contenteditable) {
        this.el.innerHTML = locale;
      } else {
        this.el.value = locale;
      }
    } else {
      this.el.setAttribute(this.attributeName, locale);
    }
  }

  private parseVars(_el: HTMLElement) {
    // parse templates to : LocalVar
    if (!this.i18n) {
      throw new Error("LocalesService is not defined!");
    }
    const newVars = this.i18n.parseTemplateVars(_el);
    this.vars = extend({ deep: true }, this.vars, newVars);

    // parse data attributes to vars
    this.vars = extend({ deep: false }, this.vars, _el.dataset);
    // Parse templates which have his own translations
    this.langVars = this.i18n.parseLocalVars(_el);
  }

  private translate(langcode?: string) {
    // If language service is not ready do nothing
    if (!(this.i18n as LocalesService).ready) {
      return;
    }
    if (!langcode) {
      langcode = (this.i18n as LocalesService).getLangcode();
      if (!langcode) {
        console.error("Langcode is required", langcode);
        return;
      }
    }

    // translate by using the already translated language variable
    if (this.langVars && this.langVars[langcode]) {
      return this.applyTranslation(this.langVars[langcode]);
    }

    if (!this.properties || this.properties.length === 0) {
      // get the default translation if available
      if (this.langVars && this.langVars.default) {
        // console.warn('Translate by default', this.langVars.default);
        return this.applyTranslation(this.langVars.default);
      }
    }

    // translate by properties, e.g. de.cart.add
    return (this.i18n as LocalesService)
      .get([langcode, ...this.properties], this.vars)
      .then((local: string) => {
        if (local && typeof local === "string") {
          // console.warn('Translate by properties', [langcode, ...this.properties], local);
          return this.applyTranslation(local);
        }
        // get the default translation if available
        if (this.langVars && this.langVars.default) {
          // console.warn('Translate by default as fallback', this.langVars.default);
          return this.applyTranslation(this.langVars.default);
        }

        return this.applyTranslation(null);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }

  private _onAttributeChanged(data: BinderAttributeChangedEvent) {
    if (data.detail.name.startsWith("data-")) {
      const varName = data.detail.name.slice(5);
      const newVar: any = {};
      newVar[varName] = data.detail.newValue;
      this.vars = extend({ deep: true }, this.vars, newVar);
      this.translate();
    }
  }

  private onAttributeChanged = this._onAttributeChanged.bind(this);

  private onLanguageChanged(langcode: string, initial: boolean) {
    // Do not translate on initial language change, we use the ready event for this
    if (!initial) {
      this.translate(langcode);
    }
  }

  /**
   * Initial stuff wee need to do after the language service is ready
   */
  private initOnReady(langcode: string, translationNeeded: boolean) {
    // Translate on translation service ready if needed
    if (translationNeeded) {
      this.translate(langcode);
    }

    // Translate if language changes
    (this.i18n as LocalesService).event.on("changed", this.onLanguageChanged);

    // Translate if binder attribute event is changed
    this.el.addEventListener("binder-changed" as any, this.onAttributeChanged);
  }

  bind(el: HTMLInputElement) {
    this.contenteditable = !!el.getAttribute("contenteditable");

    const options = I18nService.options;
    this.i18n = options.localesService;
    this.attributeName = this.args[0].toString();
  }

  routine(el: HTMLElement, translateMePathString?: string) {
    const options = I18nService.options;
    if (this.translateMePathString === null) {
      // if this is the first call of this function
      this.translateMePathString = translateMePathString;
      if (this.translateMePathString) {
        this.properties = this.translateMePathString.split(".");
      }

      this.parseVars(el);

      // Translate if language is ready
      if (this.i18n?.ready) {
        const currentLangcode = this.i18n.getLangcode();
        const initialLangcode = this.i18n.getInitialLangcode();

        if (!currentLangcode) {
          throw new Error("No language code found!");
        }

        this.initOnReady(
          currentLangcode,
          currentLangcode !== initialLangcode ||
            !options.localesService.doNotTranslateDefaultLanguage
        );
      } else {
        (this.i18n as LocalesService).event.on("ready", this.initOnReady);
      }
    } else if (this.translateMePathString !== translateMePathString) {
      // If translate string was changed
      this.translateMePathString = translateMePathString;
      if (this.translateMePathString) {
        this.properties = this.translateMePathString.split(".");
      }
      this.parseVars(el);
      this.translate();
    }
  }

  unbind() {
    this.el.removeEventListener(
      "binder-changed" as any,
      this.onAttributeChanged
    );
    this.i18n?.event.off("changed", this.onLanguageChanged);
  }
}
