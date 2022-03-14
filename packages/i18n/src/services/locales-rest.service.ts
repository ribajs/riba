import { HttpService } from "@ribajs/core/src/index.js";
import { LocalesService } from "../types/locales-service";

/**
 * LocalesRestService get locales object from url
 */
export class LocalesRestService extends LocalesService {
  public static instances: {
    [url: string]: LocalesRestService;
  } = {};

  public static getInstance(url: string) {
    return LocalesRestService.instances[url];
  }

  public locales: any = {};

  /**
   * The current defined langcode
   */
  protected currentLangcode?: string;

  /**
   * The default theme langcode before any language was chosen
   */
  protected initialLangcode?: string;

  constructor(
    protected url: string,
    doNotTranslateDefaultLanguage = false,
    showMissingTranslation = false
  ) {
    super(doNotTranslateDefaultLanguage, showMissingTranslation);

    this.url = url;

    if (!this.url) {
      throw new Error(`Url is required!`);
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
      throw new Error(`Url is required!`);
    }

    if ((window as any).Shopify.shop) {
      url = url + `?shop=${(window as any).Shopify.shop}`;
    }
    if (this.locales[url]) {
      return this.locales[url];
    }
    const resp = await HttpService.getJSON<string[]>(url);
    this.locales[url as string] = resp.body;
    return this.locales[url as string];
  }
}
