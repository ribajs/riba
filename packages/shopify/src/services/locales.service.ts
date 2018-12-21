import { Debug, getJSON } from '@ribajs/core';
import { ALocalesService } from '@ribajs/i18n';

// TODO move to the-developer-app modul
export class LocalesService extends ALocalesService {

  public static instance: LocalesService;

  public static baseUrl = 'https://the-developer-app.artandcode.studio/shopify/api/themes';

  public locales: any = {};

  /**
   * The current setted langcode
   */
  protected currentLangcode: string;

  protected themeID?: string;

  /**
   * The default theme langcode before any language was choosed
   */
  protected initalLangcode: string;

  protected debug = Debug('services:LocalesService');

  constructor(themeID?: string, doNotTranslateDefaultLanguage: boolean = true) {
    super(doNotTranslateDefaultLanguage);

    if (!themeID) {
      themeID = (window as any).Shopify.theme.id;
    }

    this.themeID = themeID;

    if (!this.themeID) {
      throw new Error(`Theme id object is requred!`);
    }

    this.initalLangcode = this.getHTMLLangcode();
    this.currentLangcode = this.initalLangcode;
    this._ready = true;
    if (!this.initalLangcode ) {
      throw new Error(`The lang attribute on the html element is requred to detect the default theme language: ${this.initalLangcode}`);
    }

    if (LocalesService.instance) {
      return LocalesService.instance;
    }

    this.switchToBrowserLanguage();

    LocalesService.instance = this;
  }

  /**
   * Get file with all languages
   * @param themeID
   */
  protected async getAll(themeID?: string) {
    if (!themeID) {
      themeID = this.themeID;
    }

    if (!themeID) {
      throw new Error(`theme object is requred!`);
    }

    let url = `${LocalesService.baseUrl}/${themeID}/locales`;
    if ((window as any).Shopify.shop) {
      url = url + `?shop=${(window as any).Shopify.shop}`;
    }
    if (this.locales[themeID]) {
      return this.locales[themeID];
    }
    return getJSON(url)
    .then((locals: any /** TODO any */) => {
      this.locales[themeID as string] = locals;
      return this.locales[themeID as string];
    });
  }

}
