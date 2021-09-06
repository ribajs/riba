import { EventDispatcher } from '@ribajs/events';
import { clone } from '@ribajs/utils/src/type';
import { Langcode, LocalPluralization, LocalVar } from '.';

export abstract class LocalesService {
  public get ready() {
    return this._ready;
  }

  public event = new EventDispatcher('i18n');

  public showMissingTranslation = false;

  protected _ready = false;

  /**
   * The current defined langcode
   */
  protected abstract currentLangcode?: string;

  /**
   * The initial / default theme langcode before any language was chosen
   */
  protected abstract initialLangcode?: string;

  constructor(
    public doNotTranslateDefaultLanguage: boolean,
    showMissingTranslation: boolean,
  ) {
    this.doNotTranslateDefaultLanguage = doNotTranslateDefaultLanguage;
    this.showMissingTranslation = showMissingTranslation;
  }

  /**
   * Get translation by properties, e.g. `de.form.newsletter_label`
   * Properties object must include the language code, e.g. `de`.
   * @param properties properties, e.g. `['de', 'form', 'newsletter', 'label']`
   * @param force Set this to true if you want to force the request also if the service is not ready, you should use this only one the time
   */
  public async get(
    properties?: string[],
    vars?: LocalVar,
    force = false,
  ): Promise<string> {
    if (!this.ready && !force) {
      throw new Error('not ready');
    }
    return (
      this.getAll()
        // extract properties
        .then((locals) => {
          if (properties && properties.length) {
            let local: any = clone(true, locals);
            for (const property of properties) {
              if (!property) {
                return null;
              }
              if (local[property]) {
                local = local[property];
              } else {
                return null;
              }
            }
            return local;
          }
          return locals;
        })
        .then((local) => {
          if (local === null && properties) {
            console.warn(
              `WARNING translation missing: "${properties.join('.')}"`,
              local,
              properties,
            );
          }
          return local;
        })
        // Replace variables in local string if vars are set
        .then((local) => {
          if (vars) {
            local = this.setTranslateStringPluralization(local, vars);
            local = this.setTranslateStringVars(local, vars);
          }
          return local;
        })
        .catch((error) => {
          console.error(error);
          this._ready = false;
          return error;
        })
    );
  }

  /**
   * Get translation by properties, e.g. `form.newsletter_label`
   * Properties object must not include the language code.
   * @param properties properties, e.g. `[form', 'newsletter', 'label']`
   */
  public async getByCurrentLang(properties: string[] = [], vars?: LocalVar) {
    const langcode = this.getLangcode();
    if (!langcode) {
      throw new Error('Langcode not found in html tag');
    }
    return this.get([langcode, ...properties], vars);
  }

  public getBrowserLangcode() {
    const lang = navigator.language || (navigator as any).userLanguage;
    const simplified = lang.split('-')[0].toLowerCase();
    return simplified;
  }

  public getHTMLLangcode(): string {
    const langcode = document.documentElement
      ? document.documentElement.lang
      : 'en';
    return langcode;
  }

  /**
   * Get the current langcode,
   * if lang was not chosen this is the langcode of the lang attribute of the html element.
   * If the language was changed this returns the changed language
   */
  public getLangcode() {
    return this.currentLangcode;
  }

  public getInitialLangcode() {
    return this.initialLangcode;
  }

  public setLangcode(langcode: string, initial = false) {
    if (this.currentLangcode !== langcode) {
      this.currentLangcode = langcode;

      // $('html').attr('lang', langcode);
      if (document.documentElement) {
        document.documentElement.lang = langcode;
      }
      this.event.trigger('changed', langcode, initial);
    }
  }

  public async getAvailableLangcodes() {
    const activeCode = this.getLangcode();
    const locals = await this.get(undefined, undefined, true)
    const langcodes: Langcode[] = [];
    for (const langcode of Object.keys(locals)) {
      langcodes.push({
        code: langcode,
        active: langcode === activeCode,
      });
    }
    return langcodes;
  }

  /**
   * Parse templates which can be used to set variables on language strings
   */
  public parseTemplateVars(el: HTMLElement): LocalVar {
    const templates = el.querySelectorAll<HTMLTemplateElement>('template');
    const vars: LocalVar = {};
    templates.forEach((template) => {
      const name: string | null = template.getAttribute('name');
      if (name !== null) {
        vars[name] = template.innerHTML.trim();
      }
    });
    return vars;
  }

  /**
   * Parse templates which have his own translations
   */
  public parseLocalVars(el: HTMLElement): LocalVar {
    const templates = el.querySelectorAll<HTMLTemplateElement>('template');
    const vars: LocalVar = {};
    templates.forEach((template) => {
      const lang: string | null = template.getAttribute('lang');
      if (lang !== null) {
        vars[lang] = template.innerHTML.trim();
      }
    });
    return vars;
  }

  /**
   * Replace variables on translated string
   * @param translateString
   * @param vars
   */
  public setTranslateStringVars(translateString: string, vars: LocalVar) {
    if (
      !translateString ||
      Object.keys(vars).length === 0 ||
      typeof translateString.match !== 'function'
    ) {
      return translateString;
    }
    const matches = translateString.match(/{{\s*?[A-Za-z0-9_-]+\s*?}}/gm);
    if (matches) {
      for (const match of matches) {
        if (match) {
          const varName = match.replace(/{{\s*|\s*}}/gm, '');
          if (
            typeof vars[varName] === 'string' ||
            typeof vars[varName] === 'number'
          ) {
            translateString = translateString.replace(
              match,
              vars[varName] as string,
            );
          }
        }
      }
    }
    return translateString;
  }

  /**
   * Get file with all languages
   */
  protected abstract getAll(): Promise<any>;

  protected async init() {
    this.initialLangcode = this.getHTMLLangcode();
    this.currentLangcode = this.initialLangcode;
    if (!this.initialLangcode) {
      throw new Error(
        `The lang attribute on the html element is required to detect the default theme language: ${this.initialLangcode}`,
      );
    }
    // Detect browser language and switch to this language when available
    const browserLangcode = this.getBrowserLangcode();
    return this.getAvailableLangcodes()
      .then((availableLangcodes) => {
        let browserLangFound = false;
        for (const availableLangcodeObj of availableLangcodes) {
          if (availableLangcodeObj.code === browserLangcode) {
            browserLangFound = true;
          }
        }
        // only switch language if the browser language is not the default language (if doNotTranslateDefaultLanguage is true)
        if (
          !this.doNotTranslateDefaultLanguage ||
          (browserLangFound && browserLangcode !== this.currentLangcode)
        ) {
          this.setLangcode(browserLangcode, true);
        }
        return availableLangcodes;
      })
      .then((/*availableLangcodes*/) => {
        this._ready = true;
        // If the current langcode is not the initial langcode then translation is needed
        const translationNeeded =
          this.currentLangcode !== this.initialLangcode ||
          !this.doNotTranslateDefaultLanguage;
        this.event.trigger('ready', this.currentLangcode, translationNeeded);
      })
      .catch((error) => {
        console.error(error);
        this._ready = false;
        return error;
      });
  }

  /**
   * see https://help.shopify.com/en/themes/development/theme-store-requirements/internationalizing/translation-filter#pluralization-in-translation-keys
   * @param translateString
   * @param vars
   */
  protected setTranslateStringPluralization(
    translateObj: LocalPluralization | string,
    vars: LocalVar,
  ) {
    if (
      vars.count &&
      typeof translateObj === 'object' &&
      translateObj !== null
    ) {
      const count = Number(vars.count);
      if (count === 0) {
        if (translateObj.zero) {
          return translateObj.zero;
        }
      } else if (count === 1) {
        if (translateObj.one) {
          return translateObj.one;
        }
      } else if (count === 2) {
        if (translateObj.two) {
          return translateObj.two;
        }
      }
    }

    if (
      typeof translateObj === 'object' &&
      translateObj !== null &&
      translateObj.other
    ) {
      return translateObj.other;
    }
    return translateObj as string;
  }
}
