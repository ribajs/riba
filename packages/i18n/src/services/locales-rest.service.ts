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

  constructor(protected url: string, doNotTranslateDefaultLanguage: boolean = false) {
    super(doNotTranslateDefaultLanguage);

    this.url = url;

    if (!this.url) {
      throw new Error(`Url is requred!`);
    }

    this.init();

    if (LocalesRestService.instances[this.url]) {
      return LocalesRestService.instances[this.url];
    }

    this.switchToBrowserLanguage();

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
    .then((locals: any /** TODO any */) => {
      this.locales[url as string] = locals;
      return this.locales[url as string];
    });
  }

}
