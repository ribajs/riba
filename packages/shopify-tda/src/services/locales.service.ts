import { LocalesRestService } from "@ribajs/i18n";
import { BASE_HOST_URL } from "../constants/index.js";

export class LocalesService extends LocalesRestService {
  public static instance: LocalesService;
  public static getInstance() {
    return this.instance;
  }
  protected constructor(
    baseUrl = BASE_HOST_URL,
    doNotTranslateDefaultLanguage = false,
    showMissingTranslation = false
  ) {
    let url = `${baseUrl}/shopify/api/themes/${
      (window as any).Shopify.theme.id
    }/locales`;
    if ((window as any).Shopify.shop) {
      url += `?shop=${(window as any).Shopify.shop}`;
    }
    super(url, doNotTranslateDefaultLanguage, showMissingTranslation);
    if (LocalesService.instance) {
      return LocalesService.instance;
    }
    LocalesService.instance = this;
  }

  public static getSingleton(
    baseUrl = BASE_HOST_URL,
    doNotTranslateDefaultLanguage = false,
    showMissingTranslation = false
  ) {
    if (LocalesService.instance) {
      return LocalesService.instance;
    }
    LocalesService.instance = new LocalesService(
      baseUrl,
      doNotTranslateDefaultLanguage,
      showMissingTranslation
    );
    return LocalesService.instance;
  }
}
