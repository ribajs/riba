import { LocalesRestService, LocalesRestOptions } from "@ribajs/i18n";
import type { MessageTree } from "@ribajs/i18n";
import { BASE_HOST_URL } from "../constants/index.js";

/**
 * Locales of a Shopify theme. The backend returns the messages of all
 * languages in one file, so the languages are read from its keys and one
 * request serves every switch.
 */
export class LocalesService extends LocalesRestService {
  public static instance?: LocalesService;

  protected constructor(
    baseUrl = BASE_HOST_URL,
    options: LocalesRestOptions = {},
  ) {
    super(
      `${baseUrl}/shopify/api/themes/${(window as any).Shopify.theme.id}/locales`,
      options,
    );
  }

  public static getSingleton(
    baseUrl = BASE_HOST_URL,
    options: LocalesRestOptions = {},
  ) {
    if (!LocalesService.instance) {
      LocalesService.instance = new LocalesService(baseUrl, options);
    }
    return LocalesService.instance;
  }

  public static getInstance() {
    return LocalesService.instance;
  }

  protected buildUrl(url: string) {
    const shop = (window as any).Shopify?.shop;
    return shop ? `${url}?shop=${shop}` : url;
  }

  protected parse(body: unknown, langcode: string) {
    return (body as Record<string, MessageTree>)[langcode];
  }

  protected async resolveLangcodes() {
    if (this.langcodes.length) {
      return this.langcodes;
    }
    const body = await this.fetchJSON(this.urlFor(this.sourceLangcode));
    return Object.keys(body as Record<string, MessageTree>);
  }
}
