import { Debug, Utils } from '@ribajs/core';
import { ALocalesService } from './locales-base.service';

/**
 * LocalesRestService get locales object from url
 */
export class LocalesRestService extends ALocalesService {

  public static instances: {
    [url: string]: LocalesRestService;
  } = {};

  public static getInstance(url: string) {
    return LocalesRestService.instances[url];
  }

  public locales: any = {};

  /**
   * The current setted langcode
   */
  protected currentLangcode?: string;

  /**
   * The default theme langcode before any language was choosed
   */
  protected initalLangcode?: string;

  protected debug = Debug('services:LocalesService');

  constructor(protected url: string, doNotTranslateDefaultLanguage: boolean = false, showMissingTranslation: boolean = false) {
    super(doNotTranslateDefaultLanguage, showMissingTranslation);

    this.url = url;

    if (!this.url) {
      throw new Error(`Url is requred!`);
    }

    if (LocalesRestService.instances[this.url]) {
      return LocalesRestService.instances[this.url];
    }

    this.init();
    LocalesRestService.instances[this.url] = this;
  }

  /**
   * Get file with all languages
   * @param themeID
   */
  protected async getAll(url?: string) {
    if (!url) {
      url = this.url;
    }

    if (!url) {
      throw new Error(`Url is requred!`);
    }

    if ((window as any).Shopify.shop) {
      url = url + `?shop=${(window as any).Shopify.shop}`;
    }
    if (this.locales[url]) {
      return this.locales[url];
    }
    return Utils.getJSON(url)
    .then((locales: any) => {
      this.locales[url as string] = locales;
      this.debug('getAll', locales);
      return this.locales[url as string];
    });
  }

}
